from django.shortcuts import render

# Create your views here
def sign_up_view(request):
    return render(request, "sign_up.html")

def login_view(request):
    return render(request, "login_view.html")

