from multiprocessing.spawn import import_main_path
import graphene
from .models import *
from .defs import *
from default import utils

class Query(graphene.ObjectType):
    maintenances = graphene.List(MaintenanceType)

    def resolve_maintenances(root, info, **kwargs):
        return Maintenance.objects.all()


schema = graphene.Schema(query=Query)