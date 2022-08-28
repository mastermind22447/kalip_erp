from django.db import models
from django.utils.translation import gettext_lazy as _ 
from ckeditor.fields import RichTextField
from apps.product.models import Product
from apps.machine.models import Machine
from apps.mold.models import Mold
from apps.order.models import Order
from django.contrib.auth.models import User
from apps.data.models import Color
from apps.employee.models import Employee

class Workflow(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name=_("Order"))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"))
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name=_("Machine"))
    mold = models.ForeignKey(Mold, on_delete=models.CASCADE, verbose_name=_("Mold"))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"))
    cycle_time = models.IntegerField(blank=True, null=True, verbose_name=_("Cycle time"))
    color = models.ForeignKey(Color, on_delete=models.CASCADE, verbose_name=_("Color"))
    color_rate = models.IntegerField(blank=True, null=True, verbose_name=_("Color rate"))
    started_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Started at"))
    machine_operator = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="machine_operator", verbose_name=_("Machine operator"))
    quality_control = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="quality_control", verbose_name=_("Quality control"))
    started_by = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name="started_by", verbose_name=_("Started by"))
    wsp = models.BooleanField(verbose_name=_("Witness Sample Placed"))
    qcfp = models.BooleanField(verbose_name=_("Quality Control Form Posted"))
    wop = models.BooleanField(verbose_name=_("Work Order Posted"))
    rkeg = models.BooleanField(verbose_name=_("Required Knowledge/Education. given"))
    detail = RichTextField(verbose_name=_("Detail"), blank=True, null=True)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_by", verbose_name=_("Created by"), blank=True, null=True)
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="updated_by", verbose_name=_("Updated by"), blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))

    def __str__(self):
        return self.order.code

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Workflow")
        verbose_name_plural = _("Workflows")
