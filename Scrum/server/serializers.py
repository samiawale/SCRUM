from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tree 
from rest_framework import serializers
from .models import User

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = ['id' , 'name','lat', 'long', 'is_water'] 


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username','role', 'first_name', 'last_name', 'password','phone']


