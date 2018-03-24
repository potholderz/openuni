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
    RetrieveUpdateAPIView
)

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)
from .permissions import IsStreamerOrReadOnly, IsUserOrReadOnly
from .serializers import *

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