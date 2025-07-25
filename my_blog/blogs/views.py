from django.shortcuts import HttpResponse, render, redirect
from django.contrib import messages
from .models import *
from pprint import pprint

# Create your views here.
def blogs_view(request):

    # Gets the newest blog with boolean is_featured is true?
    featuredBlog = Blog.objects.filter(is_featured__exact=True).order_by('-date_created').first()
    blogs = Blog.objects.order_by('-date_created')
    
    if featuredBlog:
        blogs = blogs.exclude(id__exact=featuredBlog.id)
        
    context = { 
        "blogs": blogs,
        'featuredBlog': featuredBlog,
        "blogTags" : Blog.BLOG_TAG_OPTIONS
    }    

    return render(request, "blogs.html", context)

def create_blog_view(request):
    ERROR_ENUMS = {
        'none' : 'none',
        'invalidOption' : 'invalidOption',
        'characterOverflow' : 'characterOverflow',
        'empty' : 'empty',
    }
    
    pageData = {
        'didUserSubmit': False,
        'fieldData' : {
            'blog_title' : {
                'max_len' : Blog.BLOG_TITLE_MAX_LEN,
                'value' : '',
                'error' : ERROR_ENUMS['none'],
                'html_id' : 'blog-title',
                'required' : True,
                'type': 'text'
            },
            'blog_description': {
                'max_len' : Blog.BLOG_DESCRIPTION_MAX_LEN,
                'value' : '',
                'error' : ERROR_ENUMS['none'],
                'html_id' : 'blog-description',
                'required' : True,
                'type': 'textarea'
            },
            'blog_content' : {                 
                'max_len' : Blog.BLOG_CONTENT_MAX_LEN,
                'value' : '',
                'error' : ERROR_ENUMS['none'],
                'html_id' : 'blog-content',
                'required' : True,
                'type': 'textarea'
            },
            'blog_tag' : {
                'max_len' : Blog.BLOG_TAG_MAX_LEN,
                'options' : Blog.BLOG_TAG_OPTIONS,
                'error' : ERROR_ENUMS['none'],
                'html_id' : 'blog-tag',
                'name' : 'blog-tag',
                'required' : True,
                'type': 'radio'
            },
            'blog_is_featured' : {
                'value' : False,
                'error' : ERROR_ENUMS['none'],
                'html_id' : 'blog-is-featured',
                'required' : False,
                'type': 'checkbox'      
            }
        }
    }

    if request.method == "POST":
        fields = pageData['fieldData']
        fields['blog_title']['value'] = request.POST.get('title')
        fields['blog_description']['value'] = request.POST.get('description')
        fields['blog_content']['value'] = request.POST.get('content')
        fields['blog_tag']['value'] = request.POST.get('blog-tag')
        fields['blog_is_featured']['value'] = bool(request.POST.get('is-featured'))
        
        isFormValid = True
        pageData['didUserSubmit'] = True
        
        # Fields to verify
        for fieldKey, fieldData in fields.items():
            
            if fieldData['type'] == 'text' or fieldData['type'] == 'textarea':
                valueLength = len(fieldData['value'].strip())
                
                if valueLength == 0:
                    fieldData['error'] = 'empty'
                
                elif fieldData['max_len'] != -1 and valueLength > fieldData['max_len']:
                    fieldData['error'] = 'characterOverflow'
                    
            elif fieldData['type'] == 'radio':
                
                if not fieldData['value'] in fieldData['options']:
                    fieldData['error'] = 'invalidOption'
            
            if (fieldData['error'] != 'none'):
                isFormValid = False
        
        
        print(fields)
                
        if isFormValid:
            newBlog = Blog(
                title=fields['blog_title']['value'], 
                description=fields['blog_description']['value'],
                content=fields['blog_content']['value'],
                tag=fields['blog_tag']['value'],
                is_featured=fields['blog_is_featured']['value']
            )
            
            newBlog.save()
            return redirect("/blogs")

    context = {'pageData' : pageData}
    return render(request, "create.html", context)

def read_blog_view(request, blog_id):
    blog_to_read = Blog.objects.get(id=blog_id)
    
    context = {
        "blog_to_read" : blog_to_read
    }
    
    return render(request, "readBlog.html", context=context)