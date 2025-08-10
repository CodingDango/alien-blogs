# Paste this code into markdown_extras.py
from django import template

register = template.Library()

@register.simple_tag
def is_admin(user):
    return user.is_authenticated and (user.is_staff or user.is_superuser)