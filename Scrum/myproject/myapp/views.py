from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render 
from django.http import JsonResponse 

# from loguru import logger
from datetime import datetime
from .models import Tree
from .serializers import TreeSerializer
from .serializers import UserSerializer
from .serializers import GeoData
from django.contrib.auth.hashers import make_password  # Import make_password function
from .models import User
from rest_framework import status
# from django.contrib.auth.models import User 
import jwt
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from loguru import logger

import geopandas as gpd
import os
from .models import GeoData

@api_view(['POST'])
def login(request):
    return Response({})
    

# @api_view(['POST'])
# def signup(request):
#     serializer=UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         user = User.objects.get(username=request.data['username'])
#         user.set_password(request.data['password'])
#         user.save()    
#         token = Token.objects.create(user=user)
#     return Response({"token": token.key, "user":serializer.data})
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def test_token(request):
    return Response({})

def home(request):
    return render(request,'index.html')

def test_site(request):
    return render(request,'test_site.html')
def home(request): 
    return render(request, 'index.html')

def register_view(request): 
     return render(request, 'register.html')

def login_view(request): 
     return render(request, 'login.html')

#code to retrieve trees from database

@api_view(['GET','Post'])
def tree_list(request):
    if request.method =='GET':
        tree = Tree.objects.all()
        serializer = TreeSerializer(tree,many=True)
        return JsonResponse(serializer.data,safe=False)
    if request.method == 'POST':
        serializer = TreeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        
@api_view(['GET','PUT','DELETE'])
def tree_detail(request,id):
    try: 
        tree = Tree.objects.get(pk=id)
    except Tree.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TreeSerializer(tree)
        return Response(serializer.data)
    elif request.method == 'POST':
        pass
    elif request.method == 'DELETE':
        pass


@api_view(['POST'])
def tree_mark(request): 
   name = request.data.get('name')
   lat = request.data.get('lat')
   long = request.data.get('long')
   is_water = request.data.get('is_water')

   # Create a new Tree instance with the retrieved data
   tree = Tree.objects.create(name=name, lat=lat, long=long, is_water=is_water)
   
   # Serialize the Tree object
   serializer = TreeSerializer(tree)

   # Return a response with the serialized Tree object
   return Response({'message': 'Data inserted successfully', 'tree': serializer.data})


@api_view(['POST'])
def login_action(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = get_object_or_404(User, username=username)
    
    if not check_password(password, user.password):
        # Return error response
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED) 
    else:
        # Generate JWT token
        token = generate_jwt_token(user)
        
        serializer = UserSerializer(instance=user)    
        
        # Return user data and token
        return Response({'user': serializer.data, 'token': token}, status=status.HTTP_200_OK)

        
    
   
@api_view(['POST'])
def register_action(request):
    # Serialize the request data
    serializer = UserSerializer(data=request.data)
    
    # Check if data is valid
    if serializer.is_valid():
        # Save the user
        user = serializer.save()
        
        password = make_password(request.data['password'])
        user.password = password
        user.save()

        # Generate JWT token
        token = generate_jwt_token(user)

        # Return response with serialized user data and token
        return Response({'user': serializer.data, 'token': token}, status=status.HTTP_201_CREATED)
    
    # If data is not valid, return error response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




def generate_jwt_token(user):
    # Set the expiration time for the token
    expiration_time = datetime.utcnow() + timedelta(days=1)  # Token valid for 1 day

    # Define the payload for the token
    payload = {
        'user_id': user.id,
        'username': user.username,
        'exp': expiration_time
    }

    # Generate the JWT token
    token = jwt.encode(payload, '0zoAMXlVewTJLjbzCbXGym5Ag1jYH8ZJ', algorithm='HS256')
    return token
       
def auftrag(request):
    return render(request, 'auftrag.html')

       
def Verwaltung(request):
    return render(request, 'verwaltung.html')

def get_trees(request):
    trees = Tree.objects.all()
    tree_data = [{'name': tree.name, 'lat': tree.lat, 'long': tree.long, 'is_water': tree.is_water} for tree in trees]
    return JsonResponse(tree_data, safe=False)

def geoplot(request):

    file_name = 'geo_data.geojson'

    if os.path.exists(file_name):
        gdf = gpd.read_file(file_name)

        data = []
        data = gdf[['Gattung','pflanzjahr','gebiet','strasse']]
        data['Lat'] = gdf.geometry.y
        data['Long'] = gdf.geometry.x

        for index, row in data.iterrows(): 
            GeoData.objects.create(
                Gattung = row['Gattung'],
                pflanzjahr = row['pflanzjahr'],
                gebiet = row['gebiet'],
                strasse = row['strasse'],
                lat = row['Lat'],
                long = row['Long']
            )

    return JsonResponse({"status": True}, safe=False)



@api_view(['GET'])
def get_geoplot(request):
    # Get all GeoData objects
    geo_data = GeoData.objects.all()
    
    response = [{'Gattung': value.Gattung, 'pflanzjahr': value.pflanzjahr, 'gebiet': value.gebiet, 'strasse': value.strasse, 'lat':value.lat,'long':value.long} for value in geo_data]
    return JsonResponse(response, safe=False)
    
     
    
