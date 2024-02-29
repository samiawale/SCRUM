from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tree 
from rest_framework import serializers
from .models import User,GeoData

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = ['id' , 'name','lat', 'long', 'is_water'] 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'first_name', 'last_name', 'phone']
        extra_kwargs = {
            'password': {'write_only': True},  # Exclude from serialization
        }


class GeoData(serializers.ModelSerializer):
    class Meta:
        model = GeoData
        fields = ['id', 'Gattung', 'pflanzjahr', 'gebiet', 'strasse', 'lat','long']
        


