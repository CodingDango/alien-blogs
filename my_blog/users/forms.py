# users/forms.py
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        # Point to our blueprint
        model = CustomUser
        
        # Ask for these specific fields on the sign-up page.
        # password1/password2 are added automatically.
        fields = ('first_name', 'last_name', 'email')