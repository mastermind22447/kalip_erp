from django.contrib import admin
from django.db import models
from django.forms import CheckboxSelectMultiple
from apps.employee.models import Mission, Employee

@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ('title',)
    ordering = ['title']
    search_fields = ['title']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'code', 'get_missions')
    ordering = ['full_name']
    search_fields = ['code', 'full_name', 'mission__title']

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple}
    }