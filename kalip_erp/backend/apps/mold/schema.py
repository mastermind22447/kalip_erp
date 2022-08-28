from multiprocessing.spawn import import_main_path
import graphene
from .models import *
from .defs import *
from default import utils

class Query(graphene.ObjectType):
    molds = graphene.List(MoldType)

    def resolve_molds(root, info):
        return Mold.objects.all()


schema = graphene.Schema(query=Query)