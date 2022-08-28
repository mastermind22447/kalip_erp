from graphene_django import DjangoObjectType
import graphene
from .models import Navigation

class NavigationType(DjangoObjectType):
    childrens = graphene.List(lambda: NavigationType)
    class Meta:
        model = Navigation
        # interfaces = (relay.Node, )
        fields = "__all__"
