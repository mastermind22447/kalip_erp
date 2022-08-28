from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):

    def __str__(self):
        return self.username

    class Meta:
        pass

class UserAddress(models.Model):
    title = models.CharField(_("title"), max_length=50)
    user = models.ForeignKey("user.User", verbose_name=_("address"), on_delete=models.CASCADE, related_name='user_details')
    state = models.CharField(_("state"), max_length=128)
    city = models.CharField(_("city"), max_length=128)
    addr = models.TextField(_("addr"))
    postal_code = models.CharField(_("postal code"), max_length=50)
    national_code = models.CharField(_("national code"), max_length=50)
    full_name = models.CharField(_("full name"), max_length=128)
    mobile = models.CharField(_("mobile"), max_length=50)

    active = models.BooleanField(_("active"), default=True)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)



    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('User Address')
        verbose_name_plural = _('User Addresses')