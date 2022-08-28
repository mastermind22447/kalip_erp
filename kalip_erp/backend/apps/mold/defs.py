from graphene_django import DjangoObjectType
import graphene
from .models import Mold

class MoldType(DjangoObjectType):
    class Meta:
        model = Mold
        fields = "__all__"