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

    channel = models.CharField(max_length = 100)
    service = models.CharField(max_length = 100)
    live = models.BooleanField(default = False)
    viewers = models.PositiveIntegerField(default = 0)

    def __str__(self):
        return self.profile.user.username
    
    @property
    def streamer(self):
        return self.profile
        



class Profile(model.Model):
    """
    This is a class for the Profiles Object

    Attributes:
        user: The user related to the profile. (FK) 
        stream: The stream related to the profile. (FK)

    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    stream = models.OneToOneField(Stream, related_name = 'profile', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username
    
    def __unicode__(self):
        return self.user.username
    
    @property
    def name(self):
        return self.user.username

@receiver(post_save, sender = User)
def create_profile_for_new_user(sender, created, instance, **kwargs):
    if created:
        profile = Profile(user = instance)
        profile.save()