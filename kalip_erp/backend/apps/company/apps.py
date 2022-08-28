from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class CompanyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.company'
    verbose_name = _("Companies")
