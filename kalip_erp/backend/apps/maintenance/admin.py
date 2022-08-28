
from django.contrib import admin

from apps.maintenance.models import Maintenance

@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('mold', 'machine', 'desc')

