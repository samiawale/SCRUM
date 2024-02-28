import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from models import Tree

Tree.objects.create(
    gattung = 'Baum',
    pflanzjahr = 2025,
    gebiet = 'nordpark',
    strasse = 'meine_strasse',
    lat = 1,
    long = 1
)