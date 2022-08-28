from django.contrib import admin

from .models import Company



@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_diplay = ('name', )
    ordering = ['name']
    search_fields = ["__all__"]
    autocomplete_fields = ['city', 'region',]


  