from django.db import models
from django.utils.translation import gettext_lazy as _ 
from ckeditor.fields import RichTextField
from apps.location.models import City, Region

class Company(models.Model):
    name = models.CharField(max_length=200, default='', verbose_name=_("Company name"))
    tax_admin = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Tax administration"))
    tax_number = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Tax number"))
    billing_address = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Billing address"))
    shipping_address = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Shipping address"))
    city = models.ForeignKey(to=City, blank=True, null=True, verbose_name=_("City"), on_delete=models.CASCADE)
    region = models.ForeignKey(to=Region, blank=True, null=True, verbose_name=_("Region"), on_delete=models.CASCADE)
    telephone1 = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Telephone 1"))
    telephone2 = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Telephone 2"))
    description = RichTextField(blank=True, null=True, verbose_name=_("Description"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Company")
        verbose_name_plural = _("Companies")
