import imp
from statistics import mode
from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User
from apps.data.models import Material, Supplier, Color, ComMaterial
from datetime import datetime

def set_null():
    return None

class Warehouse(models.Model):
    name = models.CharField(max_length=200, default="", verbose_name=_("Warehouse name"))
    code = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Warehouse code"))
    location = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Location"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Warehouse")
        verbose_name_plural = _("Warehouses")


class MaterialWarehouse(models.Model):
    user = models.ForeignKey(to=User, on_delete=set_null,verbose_name=_("User"))
    warehouse = models.ForeignKey(to=Warehouse, on_delete=set_null,verbose_name=_("Stock"))
    material = models.ForeignKey(to=Material, on_delete=set_null,verbose_name=_("Material"))
    supplier = models.ForeignKey(to=Supplier, on_delete=set_null,verbose_name=_("Supplier"),blank=True, null=True)
    amount = models.IntegerField(default=0, verbose_name=_("Amount"),blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.warehouse.name} - {self.material.name}"

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Material Warehouse")
        verbose_name_plural = _("Material Warehouses")

class ColorWarehouse(models.Model):
    user = models.ForeignKey(to=User, on_delete=set_null,verbose_name=_("User"))
    warehouse = models.ForeignKey(to=Warehouse, on_delete=set_null,verbose_name=_("Stock"))
    color = models.ForeignKey(to=Color, on_delete=set_null,verbose_name=_("Color"))
    supplier = models.ForeignKey(to=Supplier, on_delete=set_null,verbose_name=_("Supplier"),blank=True, null=True)
    amount = models.IntegerField(default=0, verbose_name=_("Amount"),blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))

    def __str__(self):
        return f"{self.warehouse.name} - {self.color.name}"

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Color Warehouse")
        verbose_name_plural = _("Color Warehouses")


class ComMaterialWarehouse(models.Model):
    user = models.ForeignKey(to=User, on_delete=set_null,verbose_name=_("User"))
    warehouse = models.ForeignKey(to=Warehouse, on_delete=set_null,verbose_name=_("Stock"))
    com_material = models.ForeignKey(to=ComMaterial, on_delete=set_null,verbose_name=_("ComMaterial"))
    supplier = models.ForeignKey(to=Supplier, on_delete=set_null,verbose_name=_("Supplier"),blank=True, null=True)
    amount = models.IntegerField(default=0, verbose_name=_("Amount"),blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))

    def __str__(self):
        return f"{self.warehouse.name} - {self.com_material.name}"

    __unicode__ = __str__

    class Meta:
        verbose_name = _("ComMaterial Warehouse")
        verbose_name_plural = _("ComMaterial Warehouses")