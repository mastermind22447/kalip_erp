from graphene_django import DjangoObjectType
import graphene
from .models import ColorWarehouse, MaterialWarehouse, ComMaterialWarehouse

class MaterialWarehouseType(DjangoObjectType):
    class Meta:
        model = MaterialWarehouse
        fields = '__all__'

class ComMaterialWarehouseType(DjangoObjectType):
    class Meta:
        model = ComMaterialWarehouse
        fields = '__all__'

class ColorWarehouseType(DjangoObjectType):
    class Meta:
        model = ColorWarehouse
        fields = '__all__'
