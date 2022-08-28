from multiprocessing.spawn import import_main_path
import graphene
from .models import *
from .defs import *
from default import utils

class Query(graphene.ObjectType):
    machines = graphene.List(MachineType)

    def resolve_machines(root, info, **kwargs):
        return Machine.objects.all()


schema = graphene.Schema(query=Query)