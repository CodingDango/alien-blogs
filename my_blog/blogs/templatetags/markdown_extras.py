# Paste this code into markdown_extras.py

from django import template
import markdown

register = template.Library()

@register.filter(name='convert_markdown')
def convert_markdown(value):
    return markdown.markdown(value, extensions=['fenced_code'])