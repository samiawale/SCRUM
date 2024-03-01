import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from myapp.models import Auftrag,Mitarbeiter,GeoData
from myapp.views import get_mitarbeiter
from matplotlib.path import Path
import numpy as np



#get polygon data 
poly_data = []
poly_data.append({'Lat':52.14401439798024,'Long':11.643121719425835})
poly_data.append({'Lat':52.14414607898052,'Long':11.647477626866023})
poly_data.append({'Lat':52.14116999333504,'Long':11.64777803427569})
poly_data.append({'Lat':52.14144654064812,'Long':11.641641140049614})


polygon_coords= [(11.643121719425835,52.14401439798024),(11.647477626866023,52.14414607898052),(11.64777803427569,52.14116999333504),(11.641641140049614,52.14144654064812)]
polygon_path = Path(np.array(polygon_coords))

#get tree_data
anzahl_entries = 10
geo_data_entries = GeoData.objects.all() #gives me the data as <class 'django.db.models.query.QuerySet'>

entries_within_polygon = []

for entry in geo_data_entries: 
    point = (entry.long, entry.lat)
    #print(point)

    if polygon_path.contains_point(point):
        entries_within_polygon.append(entry)

for entry in entries_within_polygon:
    print(f"ID: {entry.id}, Location: ({entry.lat}, {entry.long})")








'''''
mitarbeiter = Mitarbeiter.objects.get(mid=mitarbeiter_id)
geodata = GeoData.objects.get(id=geodata_id)

# Create and save the new Auftrag
auftrag = Auftrag(mid=mitarbeiter, gid=geodata, aktion=aktion)
auftrag.save()
'''''
        






