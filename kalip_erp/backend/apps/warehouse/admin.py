from django.contrib import admin
from django.contrib.admin import AdminSite
from django.http import HttpResponse
from .models import Warehouse, MaterialWarehouse, ColorWarehouse, ComMaterialWarehouse

@admin.register(Warehouse)
class WarehouseAdmin(admin.ModelAdmin):
    list_display = ('name', 'code')
    ordering = ['name']
    search_fields = ['name', 'code']

@admin.register(MaterialWarehouse)
class MaterialWarehouseAdmin(admin.ModelAdmin):
    list_display = ('user','warehouse', 'material', 'amount', 'created_at')
    ordering = ['-updated_at']
    search_fields = ['user', ' warehouse']
    
    def get_form(self, request, obj=None, **kwargs):
        form = super(MaterialWarehouseAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['user'].disabled = True
        form.base_fields['user'].initial = request.user
        return form

@admin.register(ComMaterialWarehouse)
class ComMaterialWarehouseAdmin(admin.ModelAdmin):
    list_display = ('user','warehouse', 'com_material', 'amount', 'created_at')
    ordering = ['-updated_at']
    search_fields = ['user', ' warehouse']
    
    def get_form(self, request, obj=None, **kwargs):
        form = super(ComMaterialWarehouseAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['user'].disabled = True
        form.base_fields['user'].initial = request.user
        return form

@admin.register(ColorWarehouse)
class ColorWarehouseAdmin(admin.ModelAdmin):
    list_display = ('user','warehouse', 'color', 'amount', 'created_at')
    ordering = ['-updated_at']
    search_fields = ['user', ' warehouse']
    list_filter = ('color',)

    def get_form(self, request, obj=None, **kwargs):
        form = super(ColorWarehouseAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['user'].disabled = True
        form.base_fields['user'].initial = request.user
        return form

