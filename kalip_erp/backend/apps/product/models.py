from code import compile_command
from django.db import models
from django.utils.translation import gettext_lazy as _ 
from ckeditor.fields import RichTextField
from apps.data.models import Material, ComMaterial

class Department(models.Model):
    title = models.CharField(max_length=100, verbose_name=_("Title"))

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = _("Department")
        verbose_name_plural = _("Departments")

class Product(models.Model):
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE, verbose_name=_("Parent product"))
    department = models.ForeignKey(Department, on_delete=models.CASCADE, verbose_name=_("Department"), null=True, blank=True)
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Product name"))
    code = models.CharField(max_length=20, default='', verbose_name=_("Product code"))
    material = models.ForeignKey(Material, on_delete=models.CASCADE, verbose_name=_("Material"), blank=True, null=True)
    material_amount = models.IntegerField(blank=True, null=True, verbose_name=_("Amount"))
    com_material = models.ForeignKey('ProductComMaterial', on_delete=models.CASCADE, related_name='product_com_material', verbose_name=_("Commercial material"), null=True, blank=True)
    image = models.ImageField(upload_to ='uploads/', blank=True, null=True, verbose_name=_("Image"))

    @property
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        else:
            return None

    @property
    def semi_products(self):
        return Product.objects.filter(parent=self.pk)

    def __str__(self) -> str:
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

# class ProductImage(models.Model):
#     image_type = models.ForeignKey(ImageType, on_delete=models.CASCADE)
#     name = models.CharField(max_length=255)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='uploads/')
#     default = models.BooleanField(default=False)

class ProductComMaterial(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Commercial material"), blank=True)
    com_material = models.ForeignKey(ComMaterial, on_delete=models.CASCADE, verbose_name=_("Commercial material"), blank=True)
    com_material_amount = models.IntegerField(blank=True, null=True, verbose_name=_("Amount"))

    def __str__(self) -> str:
        return self.com_material.name

    class Meta:
        verbose_name = _("Product com material")
        verbose_name_plural = _("Product com materials")

class SemiProduct(Product):
    class Meta:
        proxy = True
        verbose_name = _("Semi product")
        verbose_name_plural = _("Semi products")