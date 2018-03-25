from rest_framework.serializers import(
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    StringRelatedField,
    RelatedField,
    ReadOnlyField,
    PrimaryKeyRelatedField,
    ReadOnlyField,
    Field
    )

from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Stream, Profile, Note

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')



class NoteCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = [
            'title',
            'description',
            'uploader',
            'service',
            'link',
            'noteType'
        ]

class NoteDetailSerialzer(ModelSerializer):
    name = ReadOnlyField()
    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'description',
            'name',
            'uploader',
            'service',
            'link',
            'noteType'
        ]

class NoteListSerializer(ModelSerializer):
    name = ReadOnlyField()
    class Meta:
        model = Note
        fields = [
            'id',
            'title',
            'uploader',
            'name',
            'service',
            'noteType'
        ]

class ProfileCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'user',
            'stream'
        ]

class ProfileDetailSerializer(ModelSerializer):
    name = ReadOnlyField()
    uploads = NoteListSerializer(read_only = True)
    class Meta:
        model = Profile
        fields = [
            'id',
            'name'
            'user',
            'stream',
            'uploads'
        ]

class ProfileListSerializer(ModelSerializer):
    name = ReadOnlyField()
    class Meta:
        model = Profile
        fields = [
            'id'
            'name'
        ]


class StreamCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Stream
        fields = [
            'title',
            'description'
            'channel',
            'service',
            'live'
        ]

class StreamDetailSerializer(ModelSerializer):
    streamer = ProfileDetailSerializer(read_only = True)
    class Meta:
        model = Stream
        fields = [
            'id',
            'title',
            'description'
            'channel',
            'service',
            'live',
            'viewers',
            'featured',
            'streamer'
        ]

class StreamListSerializer(ModelSerializer):
    streamer = ProfileDetailSerializer(read_only = True)
    class Meta:
        model = Stream
        fields = [
            'id',
            'title',
            'service',
            'live',
            'viewers',
            'streamer'
        ]