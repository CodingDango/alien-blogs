from django.urls import path
from . import views

urlpatterns = [
    path("", views.blogs_view, name="blogs_view"),
    path("create/", views.create_blog_view, name="create_blog_view"),
    path("<int:blog_id>", views.read_blog_view, name="read_blog_view"),
]