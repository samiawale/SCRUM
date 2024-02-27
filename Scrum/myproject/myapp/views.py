from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.http import JsonResponse 
# from loguru import logger
from datetime import datetime
from .models import Tree
from .serializers import TreeSerializer
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password  # Import make_password function
from .models import User
from rest_framework import status
# from django.contrib.auth.models import User 
import jwt
from datetime import datetime, timedelta
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password



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
    return render(request, 'index.html')

def register_view(request): 
     return render(request, 'register.html')

def login_view(request): 
     return render(request, 'login.html')

@api_view(['POST'])
def login(request):    
    user = get_object_or_404(User, username=request.data['username'])
    user.last_login = timezone.now()
    user.save()
    
    if not user.check_password(request.data['password']): 
        return Response({'details': 'User Credentials are Incorrect'}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)    
    return Response({"token": token.key, "user": serializer.data})




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
       

