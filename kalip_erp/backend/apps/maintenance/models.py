
from django.db import models
from apps.mold.models import Mold
from apps.machine.models import Machine

class Maintenance(models.Model):
    mold = models.ForeignKey(Mold, on_delete=models.CASCADE, verbose_name=("Mold"), blank=True, null=True)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name=("Machine"), blank=True, null=True)
    desc = models.CharField(max_length=200, blank=True, null=True, verbose_name=("Description"))

    

    

    class Meta:
        verbose_name = ("Maintenance")
        verbose_name_plural = ("Maintenances")