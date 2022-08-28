from django.contrib.sites.shortcuts import get_current_site
from django.contrib.sites.models import Site
import datetime
import graphene
from graphene_django.types import DjangoObjectType
from graphene.types.generic import GenericScalar
from graphene import ObjectType, String, Schema, relay

from graphene.types.resolver import dict_resolver
import graphql

from django.http import JsonResponse
import json

from neomodel import Traversal

from neomodel_admin import utils

from neoapps.data.models import *
from neoapps.data.defs import *


class Query(ObjectType):
    units = graphene.List(UnitType)
    unit = graphene.Field(UnitType, id=graphene.Int())

    materials = graphene.List(MaterialType)
    material = graphene.Field(MaterialType, id=graphene.Int())


    def resolve_units(self, info, **kwargs):
        units = Unit.nodes.all()
        return units

    def resolve_unit(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            unit = utils.get_by_id(Unit, id)
            return unit

    def resolve_materials(self, info, **kwargs):
        materials = Material.nodes.all()
        return materials

    def resolve_material(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            material = utils.get_by_id(Material, id)
            return material
            
schema = Schema(query=Query)
