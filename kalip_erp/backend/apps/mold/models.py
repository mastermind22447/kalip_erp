from hmac import trans_36
from django.db import models
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User

class Mold(models.Model):
    code = models.CharField(max_length=20, default='', verbose_name=_("Mold code"))
    name = models.CharField(max_length=200, blank=True, null=True, verbose_name=_("Mold name"))
    eye_count = models.IntegerField(blank=True, null=True, verbose_name=_("Eye count"))
    detail = RichTextField(verbose_name=_("Detail"), blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("User"), blank=True, null=True)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Mold")
        verbose_name_plural = _("Molds")