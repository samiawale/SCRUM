from django.db import models

class MyTree(models.Model):
    name = models.CharField(max_length=100)
    tree_type = models.CharField(max_length=100)
    color = models.CharField(max_length = 100)
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()




