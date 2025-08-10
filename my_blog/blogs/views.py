from django.shortcuts import HttpResponse, render, redirect, get_object_or_404
from .models import *
from django.contrib.auth.decorators import login_required, user_passes_test
from .forms import BlogForm

def is_admin(user):
    return (user.is_staff and user.is_authenticated) or user.is_superuser

# Create your views here.
def blogs_view(request):

    # Gets the newest blog with boolean is_featured is true?
    blogs = Blog.objects.all().order_by('-date_created')
    featuredBlog = blogs.filter(is_featured__exact=True).first()
    blogs_as_data = list(blogs.values('id', 'title', 'description', 'date_created', 'tag', 'is_featured', 'author'))

    for blog_dict in blogs_as_data:            
        author = blogs.get(pk=blog_dict['id']).author
        blog_dict['date_created'] = blog_dict['date_created'].isoformat()
        blog_dict['author'] = { 'first_name' : author.first_name, 'last_name' : author.last_name }
        
    if featuredBlog:
        blogs = blogs.exclude(id__exact=featuredBlog.id)
        
    context = { 
        "blogs": blogs,
        'blogs_as_data' : blogs_as_data,
        'featuredBlog': featuredBlog,
        "blogTags" : Blog.BLOG_TAG_OPTIONS
    }    

    return render(request, "blogs/blogs.html", context)

@user_passes_test(is_admin, login_url="/users/login")
@login_required(login_url='/users/sign-in')
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
                is_featured=fields['blog_is_featured']['value'],
                author=request.user
            )
            
            newBlog.save()
            return redirect("/blogs")

    context = {'pageData' : pageData}
    return render(request, "blogs/create.html", context)

def read_blog_view(request, blog_id):
    blog = Blog.objects.get(id=blog_id)
    context = {"blog" : blog}

    return render(request, "blogs/readBlog.html", context=context)

def search_blog_view(request):
    query = request.GET.get('query')
    
    if (query):
        search_results = Blog.objects.filter(title__icontains=query)
    else:
        search_results = []
        
    context = {
        'blogs': search_results,
        'query': query
    }
    
    return render(request, 'blogs/search.html', context)

@user_passes_test(is_admin, login_url="/users/login")
@login_required
def delete_blog_view(request, id):
        
    if (request.POST):
        blog_to_delete = get_object_or_404(Blog, pk=id)
        blog_to_delete.delete()
    
    return redirect('/blogs')

@user_passes_test(is_admin, login_url="/users/login")
@login_required
def edit_blog_view(request, id):
    blog_to_edit = get_object_or_404(Blog, pk=id)
    
    if request.method == 'POST':
        form = BlogForm(request.POST, instance=blog_to_edit)
        
        if form.is_valid():
            form.save()
            return redirect('/blogs')
    
    else:
        form = BlogForm(instance=blog_to_edit)
    
    return render(
        request, 
        'blogs/edit.html', 
        context={
            'blog': blog_to_edit,
            'form': form
        }
    )