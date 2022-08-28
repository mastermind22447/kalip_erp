from graphene_django import DjangoObjectType
import graphene
from .models import Machine

class MachineType(DjangoObjectType):
    class Meta:
        model = Machine
        fields = "__all__"