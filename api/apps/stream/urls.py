from django.conf.urls import url,include
from . import views
from django.views.generic import TemplateView
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
<<<<<<< HEAD
    url(r'^stream/$', views.StreamList.as_view()),
    url(r'^stream/(?P<pk>[0-9]+)/$', views.StreamDetail.as_view()),
    url(r'^stream/edit/(?P<pk>[0-9]+)/$', views.StreamDetail.as_view()),
    url(r'^profile/$', views.ProfileList.as_view()),
    url(r'^profile/(?P<pk>[0-9]+)/$', views.ProfileDetail.as_view()),
    url(r'^profile/edit/(?P<pk>[0-9]+)/$', views.ProfileUpdate.as_view()),
    url(r'^note/$', views.NoteList.as_view()),
    url(r'^note/(?P<pk>[0-9]+)/$', views.NoteDetail.as_view()),
    url(r'^note/edit/(?P<pk>[0-9]+)/$', views.NoteUpdate.as_view()),
    url(r'^note/create/$', views.NoteCreate.as_view()),
]
=======
    url(r'stream/$', views.StreamList.as_view()),
    url(r'stream/(?P<pk>[0-9]+)/$', views.StreamDetail.as_view()),
    url(r'stream/edit/(?P<pk>[0-9]+)/$', views.StreamDetail.as_view()),
    url(r'profile/$', views.ProfileDetail.as_view()),
    url(r'profile/(?P<pk>[0-9]+)/$', views.ProfileDetail.as_view()),
    url(r'profile/edit/(?P<pk>[0-9]+)/$', views.ProfileUpdate.as_view()),
    url(r'note/$', views.NoteList.as_view()),
    url(r'note/(?P<pk>[0-9]+)/$', views.NoteDetail.as_view()),
    url(r'note/edit/(?P<pk>[0-9]+)/$', views.NoteUpdate.as_view()),
    url(r'note/create/$', views.NoteCreate.as_view()),
]
>>>>>>> 048acc4e93f9cbd2d025f4a32f08465673768915
