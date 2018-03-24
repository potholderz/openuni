from django.contrib import admin

# Register your models here.
from .models import *

class StreamAdmin(admin.ModelAdmin):
    """
    """
    list_display = ['id','title']


class ProfileAdmin(admin.ModelAdmin):
    """
    """    
    list_display = ['id']


class NoteAdmin(admin.ModelAdmin):
    """
    """
    list_display = ['id','title']
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Note, NoteAdmin)
admin.site.register(Stream, StreamAdmin)