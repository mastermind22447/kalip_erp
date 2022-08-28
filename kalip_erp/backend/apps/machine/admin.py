from django.contrib import admin
from .models import Machine

@admin.register(Machine)
class MachineAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    ordering = ['name']
    search_fields = ['name', 'code']

