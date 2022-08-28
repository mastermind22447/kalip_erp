from django.contrib import admin

from .models import ComMaterial, ComMaterialType, Material, Color, Supplier, Unit
from apps.warehouse.models import ColorWarehouse, MaterialWarehouse, ComMaterialWarehouse
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.db.models import Sum

@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ['name']
    search_fields = ['name']

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ['name']
    search_fields = ['name']

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'inventory', 'add_material')
    ordering = ['name']
    search_fields = ['name', 'code']

    def inventory(self, obj):
        m_wh = MaterialWarehouse.objects.filter(material=obj).aggregate(Sum('amount'))
        if m_wh['amount__sum']:
            return f"{m_wh['amount__sum']} {obj.unit}" 
        return "-"
    inventory.short_description = _('Inventory')

    def add_material(self, obj):
        return format_html(f'<a class="addlink" href="/admin/warehouse/materialwarehouse/add/?material={obj.id}">{_("Add to warehouse")}</a>')
    add_material.short_description = _('Warehouse')

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'color_field', 'inventory', 'add_color')
    ordering = ['name']
    search_fields = ['name', 'code']

    def color_field(self, obj):
        return format_html(f'<span style="background-color: {obj.color}; border: 1px solid #ccc; width: 50px; height: 17px; border-radius: 6px; display: block" >&nbsp;</span>')
    color_field.short_description = _('Color')

    def add_color(self, obj):
        return format_html(f'<a class="addlink" href="/admin/warehouse/colorwarehouse/add/?color={obj.id}">{_("Add to warehouse")}</a>')
    add_color.short_description = _('Warehouse')

    def inventory(self, obj):
        c_wh = ColorWarehouse.objects.filter(color=obj).aggregate(Sum('amount'))
        if c_wh['amount__sum']:
            return f"{c_wh['amount__sum']}"
        return "-"
    inventory.short_description = _('Inventory')

    


@admin.register(ComMaterial)
class ComMaterialAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'type', 'add_com_material')
    ordering = ['name',]
    search_fields = ['name', 'code', 'type']

    def add_com_material(self, obj):
        return format_html(f'<a class="addlink" href="/admin/warehouse/commaterialwarehouse/add/?com_material={obj.id}">{_("Add to warehouse")}</a>')
    add_com_material.short_description = _('Warehouse')

    def inventory(self, obj):
        c_wh = ComMaterialWarehouse.objects.filter(com_material=obj).aggregate(Sum('amount'))
        if c_wh['amount__sum']:
            return f"{c_wh['amount__sum']}"
        return "-"
    inventory.short_description = _('Inventory')

    


@admin.register(ComMaterialType)
class ComMaterialTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    ordering = ['name',]
    search_fields = ['name',]
