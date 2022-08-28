from graphene_django import DjangoObjectType
from .models import *

class UnitType(DjangoObjectType):
    class Meta:
        model = Unit
        fields = "__all__"

class MaterialType(DjangoObjectType):
    class Meta:
        model = Material
        fields = "__all__"

class ColorType(DjangoObjectType):
    class Meta:
        model = Color
        fields = "__all__"

class SupplierType(DjangoObjectType):
    class Meta:
        model = Supplier
        fields = "__all__"

class ComMaterialType(DjangoObjectType):
    class Meta:
        model = ComMaterial
        fields = "__all__"

# class MachineType(DjangoObjectType):
#     class Meta:
#         model = Machine
#         fields = "__all__"