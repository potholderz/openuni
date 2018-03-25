from django.shortcuts import render

from rest_framework.filters import(
    SearchFilter,
    OrderingFilter
)

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.response import Response

from rest_framework.generics import(
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
)

from rest_framework.views import APIView
from rest_framework import status


from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from .permissions import IsStreamerOrReadOnly, IsUserOrReadOnly, IsUploaderOrReadOnly
from .serializers import *

from django.contrib.auth.models import User


# Create your views here.

class StreamList(ListAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamListSerializer
    permission_classes = [AllowAny]

class StreamDetail(RetrieveAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamDetailSerializer
    permission_classes = [AllowAny]

class StreamUpdate(RetrieveUpdateAPIView):
    queryset = Stream.objects.all()
    serializer_class = StreamCreateUpdateSerializer
    permission_classes = [IsStreamerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()

class ProfileUpdate(RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileCreateUpdateSerializer
    permission_classes = [IsUserOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()

class ProfileDetail(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDetailSerializer
    permission_classes = [AllowAny]

class ProfileList(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileListSerializer 
    permission_classes = [AllowAny]

class NoteCreate(CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploader = self.request.user.profile)

class NoteList(ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteListSerializer
    permission_classes = [AllowAny]

class NoteDetail(RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteDetailSerialzer
    permission_classes = [AllowAny]

class NoteUpdate(RetrieveUpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateUpdateSerializer
    permission_classes = [IsUploaderOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()

class UserCreate(APIView):
    """
    Creates a new user
    """

    def post(self, request, format = 'json'):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.get_unique_for_date_validators
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)