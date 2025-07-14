from django.shortcuts import HttpResponse, render, redirect
from django.contrib import messages
from .models import *

# Create your views here.
def blogsView(request):
    
    allPosts = Blog.objects.all()
    
    context = {
        "posts": allPosts
    }    

    return render(request, "blogs.html", context)


def postBlogView(request):
    print("Request method: " + str(request.method))
    
    pageData = {
        'formData' : {
            'post_title' : {
                'maxLen' : Blog.BLOG_TITLE_MAX_LEN,
                'value' : '',
                'error' : 'none',
                'htmlID' : 'post-title'     
            },
            'post_description': {
                'maxLen' : Blog.BLOG_DESCRIPTION_MAX_LEN,
                'value' : '',
                'error' : 'none',
                'htmlID' : 'post-description'     
            },
            'post_content' : {                 
                'maxLen' : Blog.BLOG_CONTENT_MAX_LEN,
                'value' : '',
                'error' : 'none',
                'htmlID' : 'post-content'
            },
        }
    }
    
    if request.method == "POST":
        pageData['formData']['post_title']['value'] = request.POST.get('title')
        pageData['formData']['post_description']['value'] = request.POST.get('description')
        pageData['formData']['post_content']['value'] = request.POST.get('content')

        isFormInvalid = False

        print("# Start of posting: ")
        print(pageData)
            
        for fieldID, dataDict in pageData['formData'].items():
            
            fieldValueLength = len(dataDict['value'].strip())
            
            # Find errors
            if not fieldValueLength:
                pageData['formData'][fieldID]['error'] = 'empty'
            
            elif fieldValueLength > pageData['formData'][fieldID]['maxLen']:
                pageData['formData'][fieldID]['error'] = 'characterOverflow'
        
            # Check if error
            if pageData['formData'][fieldID]['error'] != 'none':
                isFormInvalid = True
            
            print("Field error: " + pageData['formData'][fieldID]['error'])
        
        # if valid
        if not isFormInvalid:
            newBlog = Blog(
                title=pageData['formData']['post_title']['value'], 
                description=pageData['formData']['post_description']['value'], 
                content=pageData['formData']['post_content']['value']
            )
            
            newBlog.save()
            return redirect("/blogs")
    
    context = {
        'pageData' : pageData
    }
    
    return render(request, "post.html", context)

def readBlogView(request, blogId):
    blogPost = Blog.objects.get(id=blogId)
    
    context = {
        "blogPost" : blogPost
    }
    
    return render(request, "readBlog.html", context=context)