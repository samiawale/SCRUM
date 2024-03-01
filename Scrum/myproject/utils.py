import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from myapp.models import Auftrag,Mitarbeiter,GeoData
from myapp.views import get_mitarbeiter


mit = Mitarbeiter.objects.get(mid = 1)
geo = GeoData.objects.get(id = 1)

print(geo.id)
print(mit.mid)

mitarbeiter_id = 1
geodata_id = 50
aktion = 'giessen'

'''''

mitarbeiter = Mitarbeiter.objects.get(mid=mitarbeiter_id)
geodata = GeoData.objects.get(id=geodata_id)

# Create and save the new Auftrag
auftrag = Auftrag(mid=mitarbeiter, gid=geodata, aktion=aktion)
auftrag.save()

'''''
        






