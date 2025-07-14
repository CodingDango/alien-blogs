from django.urls import path
from . import views

urlpatterns = [
    path("", views.blogsView, name="blogsView"),
    path("post/", views.postBlogView, name="postBlogView"),
    path("<int:blogId>", views.readBlogView, name="readBlogView"),
]