from django import forms
from .models import Blog

class BlogForm(forms.ModelForm):
    
    tag = forms.ChoiceField(
        choices=Blog.TAG_OPTIONS,
        widget=forms.RadioSelect
    )
    
    is_featured = forms.BooleanField(
        widget=forms.CheckboxInput,
        required=False
    )
    
    class Meta:
        model = Blog
        widgets = {
            'tag': forms.RadioSelect, # <-- Tell Django: "For the 'tag' field, just use this widget."
        }
        fields = ['title', 'description', 'tag', 'is_featured', 'content']
        labels = {
            'title': 'Title',
            'description': 'Short Description',
            'tag': 'Select A Tag',
            'is_featured': 'Feature The Blog',
        }