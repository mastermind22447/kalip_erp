from graphene_django import DjangoObjectType
import graphene
from .models import Maintenance

class MaintenanceType(DjangoObjectType):
    class Meta:
        model = Maintenance
        fields = "__all__"