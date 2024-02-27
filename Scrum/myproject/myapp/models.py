from django.db import models

class MyTree(models.Model):
    name = models.CharField(max_length=100)
    tree_type = models.CharField(max_length=100)
    color = models.CharField(max_length = 100)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()


class Tree(models.Model):
    list_display = ('id', 'name', 'lat', 'long','is_water') 

    IS_WATER_CHOICES = (
        (0, 'No'),  # 0 represents False
        (1, 'Yes'),  # 1 represents True
    )


    id = models.AutoField(primary_key=True)
    name = models.TextField()
    lat = models.FloatField()
    long = models.TextField()
    is_water = models.IntegerField(choices=IS_WATER_CHOICES, default=0)
    
    def __str__(self):
        return self.name
    

class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=150, unique=True, default='default_username')
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"



