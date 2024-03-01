"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .import views

urlpatterns = [
    path('', views.home),
    #path('admin/', admin.site.urls),   
    path('home/',views.home,name='home_view'),
    path('test_token/', views.test_token, name='test_token'),
    path('register/', views.register_view, name='register_view'),
    path('login/', views.login_view, name='login_view'),
    path('Auftrag/', views.auftrag, name='Auftrag'),
    path('Verwaltung/', views.Verwaltung, name='Verwaltung'),
    path('login-post', views.login_action, name='login_post'),
    path('tree-mark', views.tree_mark, name='tree_mark'),
    path('register-post', views.register_action, name='register_post'),
    path('trees/',views.tree_list),
    path('trees/<int:id>',views.tree_detail),
    #path('get_trees/', views.get_trees, name='get_trees'),
    path('get_mitarbeiter/', views.get_mitarbeiter, name='get_mitarbeiter'),
    path('get_auftrag/', views.get_auftrag, name='get_auftrag'),
    path('get-mitarbeiter-auftrag/', views.get_mitarbeiter_auftrag, name='get_mitarbeiter_auftrag'),
  
    #path('geoplot', views.geoplot, name='geoplot'),
    path('get-geoplot/', views.get_geoplot, name='get_geoplot'),
    path('get-geoplot/<str:filter>/', views.get_geoplot_filtered, name='get_geoplot_filtered'),
    path('get-polygon/', views.get_polygon, name='get_polygon'),

]
