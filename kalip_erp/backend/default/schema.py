from multiprocessing.spawn import import_main_path
import graphene

from .models import *
from .defs import *

class Query(graphene.ObjectType):
    navs = graphene.List(NavigationType, parentId=graphene.Int(), orderBy=graphene.String())
    nav = graphene.Field(NavigationType, id=graphene.Int(required=True))

    def resolve_navs(root, info, **kwargs):
        parentId = kwargs.get('parentId', None)
        orderBy = kwargs.get('orderBy', None)

        if parentId is not None:
            if parentId == 0:
                navigation = Navigation.objects.filter(parent_id=None)
            else:
                navigation = Navigation.objects.filter(parent_id=parentId)
        else:
            navigation = Navigation.objects.all()

        if orderBy is not None:
            navigation = navigation.order_by(orderBy)

        return navigation

    def resolve_nav(root, info, id):
        try:
            return Navigation.objects.get(id=id)
        except Navigation.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)