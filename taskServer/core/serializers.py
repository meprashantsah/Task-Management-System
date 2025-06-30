from rest_framework import serializers
from .models import User, Project, Task, ActivityLog
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'email', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role  
        data['username'] = self.user.username 

        return data


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'created_at', 'owner']


class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='assigned_to', write_only=True
    )
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status',
            'due_date', 'created_at',
            'assigned_to', 'assigned_to_id',
            'project'
        ]

    def validate_status(self, value):
        allowed = ['TODO', 'IN_PROGRESS', 'DONE']
        if value not in allowed:
            raise serializers.ValidationError("Invalid status.")
        return value


class ActivityLogSerializer(serializers.ModelSerializer):
    task = serializers.StringRelatedField()
    previous_assignee = UserSerializer()

    class Meta:
        model = ActivityLog
        fields = ['id', 'task', 'previous_assignee', 'previous_status', 'previous_due_date', 'updated_at']