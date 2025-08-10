from django.urls import path
from . import views

urlpatterns = [
    path("", views.blogs_view, name="blogs_view"),
    path("create/", views.create_blog_view, name="create_blog_view"),
    path("<int:blog_id>", views.read_blog_view, name="read_blog_view"),
    path("search", views.search_blog_view, name="search_blog_view"),
    path("delete/<int:id>", views.delete_blog_view, name="delete_blog_view"),
    path("edit/<int:id>", views.edit_blog_view, name="edit_blog_view"),
]