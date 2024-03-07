from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render 
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

# from loguru import logger
from datetime import datetime
from .models import Tree
from .serializers import TreeSerializer
from .serializers import UserSerializer
from .serializers import GeoDataSerializer
from .serializers import AuftragSerializer
from django.contrib.auth.hashers import make_password  # Import make_password function
from .models import User
from rest_framework import status
# from django.contrib.auth.models import User 
import jwt
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password
from django.db.models import Q
from loguru import logger

import geopandas as gpd
import os
from .models import GeoData
from .models import Mitarbeiter
from .models import Auftrag

from matplotlib.path import Path
import numpy as np

@api_view(['POST'])
def login(request):
    return Response({})   

@api_view(['POST'])
def test_token(request):
    return Response({})

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

# Function to generate JWT token
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

@api_view(['GET'])
def get_geoplot(request):
    # Get all GeoData objects
    geo_data = GeoData.objects.all()
    
    response = [{'Gattung': value.Gattung, 'pflanzjahr': value.pflanzjahr, 'gebiet': value.gebiet, 'strasse': value.strasse, 'lat':value.lat,'long':value.long} for value in geo_data]
    return JsonResponse(response, safe=False)
    
@api_view(['GET'])
def get_mitarbeiter(request):
    mitarbeiter = Mitarbeiter.objects.all()

    response = [{'mid':value.mid,'vorname': value.vorname, 'nachname': value.nachname} for value in mitarbeiter]
    return JsonResponse(response, safe=False)

@api_view(['GET'])    
def get_auftrag(request):
    auftrag = Auftrag.objects.all()

    response = [{'aid':value.aid,'mid': value.mid, 'gid': value.gid, 'aktion': value.aktion} for value in auftrag]
    return JsonResponse(response, safe=False)

@api_view(['GET'])
def get_mitarbeiter_auftrag(request, id):
    print(id)
    auftrag = Auftrag.objects.filter(mid_id = id)
    

    response = [{'aid':value.aid,'mid': value.mid.mid, 'gid': value.gid.id, 'aktion': value.aktion} for value in auftrag]
    return JsonResponse(response, safe=False)

@api_view(['GET'])
def get_geoplot_filtered(request, filter):
    if filter:
        filter_dict = json.loads(filter)
        query = Q()
        for key, value in filter_dict.items():
            # Use __icontains for case-insensitive partial string match
            query &= Q(**{f"{key}__icontains": value})
        geo_data = GeoData.objects.filter(query)
    else:
        geo_data = GeoData.objects.all()

    response = [{'Gattung': value.Gattung, 'pflanzjahr': value.pflanzjahr, 'gebiet': value.gebiet, 'strasse': value.strasse, 'lat': value.lat, 'long': value.long} for value in geo_data]
    return JsonResponse(response, safe=False)

@api_view(['GET'])
def get_polygon(request, poly_data):
    polygon = json.loads(poly_data)['polygon']
    polygon_coords = [(point[0], point[1]) for point in polygon]
    # print(polygon_coords)
    poly_path = Path(np.array(polygon_coords))

    geo_data = GeoData.objects.all()

    trees_within_polygon = []

    for tree in geo_data:
        point = (tree.lat, tree.long)
        if poly_path.contains_point(point):
            trees_within_polygon.append(tree)

    
    response = [{'Gattung': value.Gattung, 'pflanzjahr': value.pflanzjahr, 'gebiet': value.gebiet, 'strasse': value.strasse, 'lat': value.lat, 'long': value.long } for value in trees_within_polygon]
    return JsonResponse(response, safe=False)
    
# @api_view(['POST'])
# def create_auftrag(request):
#     serializer = AuftragSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_auftrag(request):
    if request.method == 'POST':
        mid = request.POST.get('mid')
        gids = request.POST.getlist('gids')
        aktion = request.POST.get('aktion')
        mitarbeiter = Mitarbeiter.objects.get(pk=mid)
        
        # Split the string into a list of strings
        print(gids)

        # Convert each string in the list to an integer
        gid_list = gids[0].split(',')
        
        for gid in gid_list:
            geodata = GeoData.objects.get(pk=gid)
            Auftrag.objects.create(mid=mitarbeiter, gid=geodata, aktion=aktion)
        return JsonResponse({'status': 'success'}, status=201)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=400)

@api_view(['POST'])
def water_tree(request,id):
    geo_data = GeoData.objects.get(id=id)
    geo_data.last_watered = datetime.now()
    geo_data.is_water = True
    geo_data.save()
    return JsonResponse({'message': 'Data updated successfully'}) 

def water_filtered(request, filter):
    if filter:
        filter_dict = json.loads(filter)
        query = Q()
        for key, value in filter_dict.items():
            # Use __icontains for case-insensitive partial string match
            query &= Q(**{f"{key}__icontains": value})
        geo_data = GeoData.objects.filter(query)
    else:
        geo_data = GeoData.objects.all()

    for tree in geo_data:
        tree.last_watered = datetime.now()
        tree.is_water = True
        tree.save()
    return JsonResponse({'message': 'Data updated successfully'}) 

def water_polygon(request, poly_data):
    polygon = json.loads(poly_data)['polygon']
    polygon_coords = [(point[0], point[1]) for point in polygon]
    # print(polygon_coords)
    poly_path = Path(np.array(polygon_coords))

    geo_data = GeoData.objects.all()

    for tree in geo_data:
        point = (tree.lat, tree.long)
        if poly_path.contains_point(point):
            tree.last_watered = datetime.now()
            tree.is_water = True
            tree.save()
    return JsonResponse({'message': 'Data updated successfully'})

@api_view(['POST'])
def delete_auftrag(request,id):
    auftrag = Auftrag.objects.get(aid=id)
    auftrag.delete()
    return JsonResponse({'message': 'Data deleted successfully'})

@api_view(['POST'])
def delete_mitarbeiter(request,id):
    mitarbeiter = Mitarbeiter.objects.get(mid=id)
    mitarbeiter.delete()
    return JsonResponse({'message': 'Data deleted successfully'})   


