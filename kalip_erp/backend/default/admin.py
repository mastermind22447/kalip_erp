from django.contrib import admin

from .models import Navigation

@admin.register(Navigation)
class NavigationAdmin(admin.ModelAdmin):
    list_display = ('label', 'parent', 'url', 'icon', 'order')
    ordering = ['order']
    search_fields = ['label,']
