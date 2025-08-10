from django.db import models
from django.conf import settings

# Create your models here.
class Blog(models.Model):
    BLOG_TITLE_MAX_LEN = 100
    BLOG_DESCRIPTION_MAX_LEN = 300
    BLOG_CONTENT_MAX_LEN = 10000
    BLOG_DATE_CREATED_FORMAT = '%B %m, %Y' # Example: January 30, 2025
    BLOG_TAG_MAX_LEN = 30 # These are short. example is 'Discoveries'. just one tag because i dont feel like learning 'ManyToMany' bullshit.
    BLOG_TAG_OPTIONS = ['theories', 'discoveries', 'interviews', 'stories'] # A Post can only have one tag.
    TAG_OPTIONS = (
        ('theories', 'Theories'), 
        ('discoveries', 'Discoveries'), 
        ('interviews', 'Interviews'), 
        ('stories', 'Stories'),
    )

    title = models.CharField(max_length=BLOG_TITLE_MAX_LEN)
    description = models.CharField(max_length=BLOG_DESCRIPTION_MAX_LEN)
    content = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    tag = models.CharField(max_length=BLOG_TAG_MAX_LEN)
    is_featured = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.title