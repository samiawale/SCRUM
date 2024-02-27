from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse 
# from loguru import logger
from datetime import datetime
from .models import Tree
from .serializers import TreeSerializer
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password  # Import make_password function
from .models import User, Tree
from rest_framework import status
# from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

def index(request):
    all_trees = Tree.objects.all()
    return render(request, 'index.html',{'all_trees': all_trees})

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

#def home(request): 
#    trees = Tree.objects.all()
#    return render(request, 'index.html',{'trees':trees})

def test_site(request):
    trees = Tree.objects.all()
    return render(request,'test_site.html',{'trees':trees})

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
def register_action(request): 
    # Serialize the request data
    serializer = UserSerializer(data=request.data)
    
    # Check if data is valid
    if serializer.is_valid():
        
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        # Try to retrieve an existing token for the user
        token = Token.objects.filter(user=user).first()

        # If no token exists, create a new one
        if not token:
            token = Token.objects.create(user=user)  
        
        # Return response with serialized user data and token
        return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED)
    
    # If data is not valid, return error response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

