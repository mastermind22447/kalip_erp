from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from colorfield.fields import ColorField
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Supplier(models.Model):
    name = models.CharField(max_length=200, default="", verbose_name=_("Supplier name"))
    addres = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("address"))
    telephone = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("telephone"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Supplier")
        verbose_name_plural = _("Suppliers")

class Unit(models.Model):
    name = models.CharField(max_length=200, default="", verbose_name=_("Name"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Unit")
        verbose_name_plural = _("Units")

class ComMaterialType(models.Model):
    name = models.CharField(max_length=200, default="", verbose_name=_("Name"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Commercial material type")
        verbose_name_plural = _("Commercial material types")

class Material(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Material code"))
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Material name"))
    unit = models.ForeignKey(to=Unit, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_("Unit")) 
    alarm_inventory = models.IntegerField(blank=True, null=True, verbose_name=_("Alarm inventory"))
    technical_detail = RichTextField(verbose_name=_("Technical detail"), blank=True, null=True)
    security_detail = RichTextField(verbose_name=_("Security detail"), blank=True, null=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Raw material")
        verbose_name_plural = _("Raw materials")


class ComMaterial(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Commercial material code"))
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Commercial material name"))
    unit = models.ForeignKey(to=Unit, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_("Unit")) 
    type = models.ForeignKey(to=ComMaterialType, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_("Commercial material type")) 
    alarm_inventory = models.IntegerField(blank=True, null=True, verbose_name=_("Alarm inventory"))
    technical_detail = RichTextField(verbose_name=_("Technical detail"), blank=True, null=True)
    security_detail = RichTextField(verbose_name=_("Security detail"), blank=True, null=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Commercial material")
        verbose_name_plural = _("Commercial materials")

        

class Color(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Color code"))
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Color name"))
    color = ColorField(default='#FF0000', verbose_name=_("Color"))
    technical_detail = RichTextField(verbose_name=_("Technical detail"), blank=True, null=True)
    security_detail = RichTextField(verbose_name=_("Security detail"), blank=True, null=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Color")
        verbose_name_plural = _("Colors")




class ImageType(models.Model):
    title = models.CharField(max_length=100, verbose_name=_("Title"))

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _("Image type")
        verbose_name_plural = _("Image types")

class Image(models.Model):
    image = models.ImageField(upload_to="images")
    image_type = models.ForeignKey(ImageType, on_delete=models.CASCADE, blank=True, null=True)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    order_id = models.IntegerField(default=0)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

class Product(models.Model):
    name = models.CharField(max_length=100)