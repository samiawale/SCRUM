from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tree 
from rest_framework import serializers
from .models import User,GeoData
from .models import Mitarbeiter
from .models import Auftrag

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
        
class Mitarbeiter(serializers.ModelSerializer):
    class Meta:
        model = Mitarbeiter
        fields = ['id', 'first_name', 'last_name']

class Auftrag(serializers.ModelSerializer):
    class Meta:
        model = Auftrag
        fields = ['aid', 'mid', 'gid', 'aktion']

