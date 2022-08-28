import imp
from django.db import models
from django.utils.translation import gettext_lazy as _


class Machine(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Machine code"))
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Machine name"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Machine")
        verbose_name_plural = _("Machines")
