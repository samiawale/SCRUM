from django.contrib import admin

from .models import Tree, User, GeoData,Mitarbeiter

# admin.site.register(MyTree)
admin.site.register(Tree)
admin.site.register(User)
admin.site.register(GeoData)
admin.site.register(Mitarbeiter)

