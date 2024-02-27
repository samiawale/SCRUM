from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test_site/',views.test_site,name='test_site'),
    #path('home/',views.home),
    path('test_token/', views.test_token, name='test_token'),
    path('register/', views.register_view, name='register_view'),
    path('login/', views.login_view, name='login_view'),
    path('tree-mark', views.tree_mark, name='tree_mark'),
    path('register-post', views.register_action, name='register_post'),
    path('trees/',views.tree_list),
    path('trees/<int:id>',views.tree_detail),

]
