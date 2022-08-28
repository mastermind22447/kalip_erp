from django.db import models
from django.utils.translation import gettext_lazy as _

class City(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("City name"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("City")
        verbose_name_plural = _("Cities")


class Region(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Region name"))
    city = models.ForeignKey(to=City, on_delete=models.CASCADE,blank=True, null=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Region")
        verbose_name_plural = _("Regions")