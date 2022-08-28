from django.contrib import admin

from .models import Mold
@admin.register(Mold)
class MoldAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'eye_count')
    ordering = ['name']
    search_fields = ['name', 'code']
