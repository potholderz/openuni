from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save



# Create your models here.

class Stream(models.Model):
    """
    This is a class for the Stream Object

    Attributes:
        channel: string that contains the source of the stream
        service: string that contains the website where the source is coming from (youtube, twitch, etc)
        live: boolean if the stream is live or not
        viewers: integer that holds the amount of current viewers
    """
    title = models.CharField(max_length = 100, default = 'New Stream')
    description = models.TextField()
    channel = models.CharField(max_length = 100, blank = True)
    service = models.CharField(max_length = 100, blank = True)
    live = models.BooleanField(default = False)
    featured = models.BooleanField(default = False)
    viewers = models.PositiveIntegerField(default = 0)

    def __str__(self):
        return self.title
    
    @property
    def streamer(self):
        return self.profile
        

class Profile(models.Model):
    """
    This is a class for the Profiles Object

    Attributes:
        user: The user related to the profile. (FK) 
        stream: The stream related to the profile. (FK)

    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name = 'profile')
    stream = models.OneToOneField(Stream, related_name = 'profile', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
    def __unicode__(self):
        return self.user.username
    
    @property
    def name(self):
        return self.user.username
    
    @property
    def uploads(self):
        return self.uploads

class Note(models.Model):
    """
    This is the class for the Notes object

    Attributes:
        title: string that holds the title of the Notes
        user: the user who the Notes is uploaded by
        service: the service in which the Notes is being linked from
        link: the link to the Notes 
        noteType: the type of Notes
    """
    NOTES_CHOICES = (
        ('video', 'video'),
        ('pdf', 'pdf'),
        ('csv', 'csv'),
        ('audio', 'audio'),
        ('compressed', 'compressed'),
        ('text', 'text')
    )


    title = models.CharField(max_length = 100)
    description = models.TextField(blank = True)
    uploader = models.ForeignKey(Profile, on_delete = models.CASCADE, related_name='uploads')
    service = models.CharField(max_length = 100, blank = True)
    link = models.CharField(max_length = 100, blank = True)
    featured = models.BooleanField(default = False)
    noteType = models.CharField(max_length = 15, choices = NOTES_CHOICES, default = 'text')

    @property
    def name(self);
        return self.uploader.user.username


    
@receiver(post_save, sender = User)
def create_profile_for_new_user(sender, created, instance, **kwargs):
    if created:
        stream = Stream()
        stream.save()
        profile = Profile(user = instance, stream = stream)
        profile.save()