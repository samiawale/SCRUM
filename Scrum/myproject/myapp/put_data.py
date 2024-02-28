from models import Tree
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # 'myproject' mit dem Namen Ihres Django-Projekts ersetzen
django.setup()

Tree.objects.create(
    gattung = 'Baum',
    pflanzjahr = 2025,
    gebiet = 'nordpark',
    strasse = 'meine_strasse',
    lat = 1,
    long = 1
)