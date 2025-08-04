# users/models.py
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    # No more username. It's gone.
    username = None
        
    # These are now required fields on our user.
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    
    # Email is now the unique login identifier.
    email = models.EmailField('email address', unique=True)

    USERNAME_FIELD = 'email'
    # These fields are required when running `createsuperuser`.
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"