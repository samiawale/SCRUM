from django.db import models

# class MyTree(models.Model):
#     name = models.CharField(max_length=100)
#     tree_type = models.CharField(max_length=100)
#     x_coordinate = models.FloatField()
#     y_coordinate = models.FloatField()


class Tree(models.Model):
    IS_WATER_CHOICES = (
        (0, 'No'),  # 0 represents False
        (1, 'Yes'),  # 1 represents True
    )
    id = models.AutoField(primary_key=True)
    gattung  = models.CharField(max_length=50)
    pflanzjahr = models.IntegerField(null = True, blank = True)
    gebiet = models.CharField(max_length = 50)
    strasse = models.CharField(max_length=50)
    lat = models.FloatField()
    long = models.FloatField()
    is_water = models.IntegerField(choices=IS_WATER_CHOICES, default=0)
    
    def __str__(self):
        return self.gattung
    

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
     

class GeoData(models.Model):
    id = models.AutoField(primary_key=True)
    Gattung = models.CharField(max_length=255)
    pflanzjahr = models.CharField(max_length=255)
    gebiet = models.CharField(max_length=255)
    strasse = models.CharField(max_length=255)
    lat = models.FloatField()
    long = models.FloatField()

class Mitarbeiter(models.Model):
    mid = models.AutoField(primary_key=True)
    vorname = models.CharField(max_length = 50)
    nachname = models.CharField(max_length = 50)

class Auftrag(models.Model):
    aid = models.AutoField(primary_key=True)
    mid = models.ForeignKey(Mitarbeiter,on_delete=models.CASCADE)
    gid = models.ForeignKey(GeoData,on_delete = models.CASCADE)
    aktion = models.CharField(max_length = 50)

    




