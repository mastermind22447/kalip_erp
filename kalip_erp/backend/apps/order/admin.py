from django.contrib import admin
from django.db import models

from .models import ClosedOrdres, NewOrdres, OpenOrdres, Order, ReturnedOrdres, OrderProducts, OrderComMaterial

class OrderProductsInline(admin.TabularInline):
    model = OrderProducts
    extra = 0
    

class OrderComMaterialInline(admin.TabularInline):
    model = OrderComMaterial
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('code', 'company','product', 'status')
    ordering = ['-created_at']
    search_fields = ['code', 'company',]

    inlines = [OrderProductsInline,OrderComMaterialInline]

    list_filter = ('status',)


@admin.register(NewOrdres)
class NewOrdresAdmin(admin.ModelAdmin):
    list_display = ('code', 'company','product', 'status')
    ordering = ['-created_at']
    search_fields = ['code', 'company']

    def get_queryset(self, request):
        qs = super(NewOrdresAdmin, self).get_queryset(request)
        return qs.filter(status=1)


@admin.register(OpenOrdres)
class OpenOrdresAdmin(admin.ModelAdmin):
    list_display = ('code', 'company','product', 'status')
    ordering = ['-created_at']
    search_fields = ['code', 'company']

    def get_queryset(self, request):
        qs = super(OpenOrdresAdmin, self).get_queryset(request)
        return qs.filter(status=2)


@admin.register(ClosedOrdres)
class ClosedOrdresAdmin(admin.ModelAdmin):
    list_display = ('code', 'company','product', 'status')
    ordering = ['-created_at']
    search_fields = ['code', 'company']

    def get_queryset(self, request):
        qs = super(ClosedOrdresAdmin, self).get_queryset(request)
        return qs.filter(status=3)

@admin.register(ReturnedOrdres)
class ReturnedOrdresAdmin(admin.ModelAdmin):
    list_display = ('code', 'company','product', 'status')
    ordering = ['-created_at']
    search_fields = ['code', 'company']

    def get_queryset(self, request):
        qs = super(ReturnedOrdresAdmin, self).get_queryset(request)
        return qs.filter(status=4)