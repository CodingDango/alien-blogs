from django.db import models

# Create your models here.
class Blog(models.Model):
    BLOG_TITLE_MAX_LEN = 50
    BLOG_DESCRIPTION_MAX_LEN = 180
    BLOG_CONTENT_MAX_LEN = 10000
    
    title = models.CharField(max_length=BLOG_TITLE_MAX_LEN)
    description = models.CharField(max_length=BLOG_DESCRIPTION_MAX_LEN)
    content = models.TextField()
    
    def __str__(self):
        return self.title