from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('contributor', 'Contributor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_projects'
    )

    def __str__(self):
        return self.title


class Task(models.Model):
    STATUS_CHOICES = [
        ('TODO', 'Todo'),
        ('IN_PROGRESS', 'In Progress'),
        ('DONE', 'Done'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='TODO')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='tasks'
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    is_deleted = models.BooleanField(default=False)  # Soft delete flag

    def __str__(self):
        return f"{self.title} ({self.status})"
