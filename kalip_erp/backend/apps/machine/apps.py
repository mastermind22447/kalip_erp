from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class MachineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.machine'
    verbose_name = _("Machines")
