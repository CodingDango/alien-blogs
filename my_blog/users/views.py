from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from .forms import CustomUserCreationForm # Import our new form

# Create your views here
def sign_up_view(request):
    
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        
        if form.is_valid():
            form.save()
            return redirect('/users/sign-in/')
        
    else:
        form = CustomUserCreationForm()
        
    context = {'form' : form}
    
    return render(request, "users/sign_up.html", context=context)

def sign_in_view(request):
    context = {
        'error_msg': None
    }
    
    if request.method == 'POST':
        
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('/') # Redirect to a success page
        
        else:
            # I can't find a way which field is wrong.
            context['error_msg'] = "User doesn't exist."
    
    return render(request, 'users/sign_in.html', context=context)

@login_required(login_url='/users/sign-in')
def sign_out_view(request):
    logout(request)
    return redirect('/')
    