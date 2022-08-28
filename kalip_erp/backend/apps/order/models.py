from pyexpat import model
from django.db import models
from django.utils.translation import gettext_lazy as _ 
from ckeditor.fields import RichTextField
from apps.data.models import Material, ComMaterial, Color, Supplier
from apps.company.models import Company
from apps.product.models import Product, ProductComMaterial
from apps.warehouse.models import ColorWarehouse, ComMaterialWarehouse
from django.contrib.auth.models import User

STATUS_CHOICES = (
    (1, _("New")),
    (2, _("Open")),
    (3, _("Closed")),
    (4, _("Returned")),
)

class Order(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Order code"))
    company = models.ForeignKey(Company, on_delete=models.CASCADE, verbose_name=_("Company"), blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"), blank=True, null=True)
    order_amount = models.IntegerField(null=True, blank=True, verbose_name=_("Order amount"))
    box_size = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Box size"))
    inner_box_size = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Inner box size"))
    special_box = models.BooleanField(default=False, verbose_name=_("Special box"))
    box_pieces = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Pieces in box"))
    has_bag = models.BooleanField(default=False, verbose_name=_("Has bag"))
    bag = models.ForeignKey(ComMaterial, on_delete=models.CASCADE, verbose_name=_("Bag"), blank=True, null=True)
    seperator = models.BooleanField(default=False, verbose_name=_("Seperator"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))
    order_at = models.DateTimeField(null=True, blank=True, verbose_name=_("Order at"))
    finished_at = models.DateTimeField(null=True, blank=True, verbose_name=_("Finished at"))
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, verbose_name=_("Status"))
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("User"), blank=True, null=True)
    barkod = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Barkod"))
    eticket = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Eticket"))
    delivery_address = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Delivery address"))
    delivery_mode = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Delivery mode"))
    conditions = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Colditions"))

    @property
    def status_title(self):
        print(self.status)
        return STATUS_CHOICES[self.status-1][1]

    def __str__(self):
        return self.code

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

class OrderProducts(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderProducts', verbose_name=_("Order"), blank=True, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"), blank=True, null=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, verbose_name=_("Color"), blank=True, null=True)
    color_supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, verbose_name=_("Supplier"), blank=True, null=True)
    color_percent = models.CharField(max_length=10, default=0, verbose_name=_("Color percent"))
    has_silk = models.BooleanField(default=False, verbose_name=_("Has silk"))

    def __str__(self) -> str:
        return super().__str__()

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Order product")
        verbose_name_plural = _("Order products")


class OrderComMaterial(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name=_("Order"))
    com_material = models.ForeignKey(ComMaterial,  on_delete=models.CASCADE, verbose_name=_("Commercial material"))

    def __str__(self) -> str:
        return super().__str__()

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Order commercial material")
        verbose_name_plural = _("Order commercial materials")


class NewOrdres(Order):
    class Meta: 
        proxy = True
        verbose_name = _("New order")
        verbose_name_plural = _("New orders")


class OpenOrdres(Order):
    class Meta: 
        proxy = True
        verbose_name = _("Open order")
        verbose_name_plural = _("Open orders")


class ClosedOrdres(Order):
    class Meta: 
        proxy = True
        verbose_name = _("Closed order")
        verbose_name_plural = _("Closed orders")


class ReturnedOrdres(Order):
    class Meta: 
        proxy = True
        verbose_name = _("Returned order")
        verbose_name_plural = _("Returned orders")