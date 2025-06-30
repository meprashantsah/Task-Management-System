from django.shortcuts import render
from rest_framework import generics, viewsets, permissions, filters, status
from .models import User, Project, Task, ActivityLog
from .serializers import UserSerializer, ProjectSerializer, TaskSerializer, ActivityLogSerializer, CustomTokenObtainPairSerializer
from .permissions import IsAdmin, IsContributor
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdmin] 
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['role']

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description']
    permission_classes = [permissions.IsAuthenticated]


    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            return [IsAdmin()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)



class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'status']
    filterset_fields = ['status', 'project']
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Show only not-deleted tasks
        user = self.request.user
        if user.role == 'admin':
            return Task.objects.filter(is_deleted=False)
        return Task.objects.filter(assigned_to=user, is_deleted=False)
    

    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            if self.request.user.role == 'admin':
                return [IsAdmin()]
            elif self.request.user.role == 'contributor':
                return [IsContributor()]
        return [permissions.IsAuthenticated()]
    

    def perform_destroy(self, instance):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response({"detail": "Task soft-deleted."}, status=status.HTTP_204_NO_CONTENT)
    
    
    def update(self, request, *args, **kwargs):
        task = self.get_object()

        # Save previous state
        previous_assignee = task.assigned_to
        previous_status = task.status
        previous_due_date = task.due_date

        # Proceed with update
        response = super().update(request, *args, **kwargs)

        # Update or create activity log
        ActivityLog.objects.update_or_create(
            task=task,
            defaults={
                'previous_assignee': previous_assignee,
                'previous_status': previous_status,
                'previous_due_date': previous_due_date,
            }
        )

        return response



class ActivityLogListView(generics.ListAPIView):
    queryset = ActivityLog.objects.select_related('task', 'previous_assignee')
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAdmin]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_me(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)