from asyncio.format_helpers import extract_stack
from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from apps.data.models import Image
from .models import Product, Department, ProductComMaterial, SemiProduct
from apps.data.models import ComMaterial
from django.utils.translation import gettext_lazy as _
from django.utils.html import format_html
from django.contrib.admin import SimpleListFilter
from django.shortcuts import resolve_url
from django.contrib.admin.templatetags.admin_urls import admin_urlname  

class ProductFilter(SimpleListFilter):
    title = _('Product') # or use _('country') for translated title
    parameter_name = 'parent'

    def lookups(self, request, model_admin):
        products = set([p for p in model_admin.model.objects.filter(parent_id=None)])
        print(products)
        return [(p.id, p.name) for p in products]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(parent__id__exact=self.value())

class ProductImageInline(GenericTabularInline):
    model = Image
    extra = 0
    verbose_name = _("Product image")
    verbose_name_plural = _("Product images")

class ProductInline(admin.TabularInline):
    model = Product
    extra = 0
    verbose_name = _("Semi product")
    verbose_name_plural = _("Semi products")


class ProductComMaterialInline(admin.TabularInline):
    model = ProductComMaterial
    extra = 0
    verbose_name = _("Com Material")
    verbose_name_plural = _("Com Materials")

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'semi_product_link', 'image_tag')
    ordering = ['name']
    search_fields = ['code', 'name']
    exclude = ['parent',]
    readonly_fields = ['image_tag']

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img style="width: 100px; height:100px; border: 1px solid #ccc; border-radius: 5px;"  src="{}" />'.format(obj.image.url))
        return format_html('<span style="width: 100px; height:100px; border: 1px solid #ccc; border-radius: 5px; display: block"></span>')

    def semi_product_link(self, obj):
        url = resolve_url(admin_urlname(Product._meta, 'change'), obj.id)
        return format_html(f'<a href="/admin/product/semiproduct/?parent__id__exact={obj.id}">{_("Semi products")}</a>')

    image_tag.short_description = 'Image'
    

    def get_queryset(self, request):
        qs = super(ProductAdmin, self).get_queryset(request)
        return qs.filter(parent_id=None)

    inlines = [
        ProductInline,
        ProductComMaterialInline,
        ProductImageInline,
    ]

@admin.register(SemiProduct)
class SemiProductAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'parent', 'image_tag')
    ordering = ['name']
    search_fields = ['code', 'name']
    exclude = ['parent',]
    # list_filter = (ProductFilter,)

    def image_tag(self, obj):
        if obj.image:
            return format_html('<img style="width: 100px; height:100px; border: 1px solid #ccc; border-radius: 5px;"  src="{}" />'.format(obj.image.url))
        return format_html('<span style="width: 100px; height:100px; border: 1px solid #ccc; border-radius: 5px; display: block"></span>')

    image_tag.short_description = 'Image'

    def get_queryset(self, request):
        qs = super(SemiProductAdmin, self).get_queryset(request)
        return qs.exclude(parent_id=None)

@admin.register(Department)
class Department(admin.ModelAdmin):
    list_display = ('title',)
    ordering = ["title"]
    

@admin.register(ProductComMaterial)
class ProductComMaterial(admin.ModelAdmin):
    list_display = ('product','com_material')
    ordering = ["product"]
    