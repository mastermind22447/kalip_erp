from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField

class Mission(models.Model):
    title = models.CharField(max_length=200, verbose_name=_("Mission title"))
    detail = RichTextField(verbose_name=_("Detail"), blank=True, null=True)

    def __str__(self):
        return self.title

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Mission")
        verbose_name_plural = _("Missions")


class Employee(models.Model):
    full_name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Full name"))
    code = models.CharField(max_length=20, default='', verbose_name=_("Employee code"))
    mission = models.ManyToManyField(Mission, verbose_name=_("Mission"))
    detail = RichTextField(verbose_name=_("Detail"), blank=True, null=True)

    def get_missions(self):
        return " - ".join([e.title for e in self.mission.all()])

    def __str__(self):
        return self.full_name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Employee")
        verbose_name_plural = _("Employees")
