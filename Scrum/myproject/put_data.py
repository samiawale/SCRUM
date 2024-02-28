import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from myapp.models import Tree

import os
import geopandas as gpd

file_name = 'geo_data.geojson'

if os.path.exists(file_name):
    gdf = gpd.read_file(file_name)

    data = gdf[['Gattung','pflanzjahr','gebiet','strasse']]
    data['Lat'] = gdf.geometry.y
    data['Long'] = gdf.geometry.x
    

    print(data)
    
else:
    print("File does not exist in the current directory.")



'''''

Tree.objects.create(
    gattung = 'Baum',
    pflanzjahr = 2025,
    gebiet = 'nordpark',
    strasse = 'meine_strasse',
    lat = 1,
    long = 1
)
'''''