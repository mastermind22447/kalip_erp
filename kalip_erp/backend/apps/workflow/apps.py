from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class WorkflowConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.workflow'
    verbose_name = _("Workflows")
