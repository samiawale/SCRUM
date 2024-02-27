from django.contrib import admin

from .models import MyTree, Tree, User

admin.site.register(MyTree)
admin.site.register(Tree)
admin.site.register(User)

