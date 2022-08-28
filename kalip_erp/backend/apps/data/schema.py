from multiprocessing.spawn import import_main_path
import graphene

from .models import *
from .defs import *

class Query(graphene.ObjectType):
    units = graphene.List(UnitType)
    unit = graphene.Field(UnitType, id=graphene.Int(required=True))

    def resolve_units(root, info):
        return Unit.objects.all()

    def resolve_unit(root, info, id):
        try:
            return Unit.objects.get(id=id)
        except Unit.DoesNotExist:
            return None


    materials = graphene.List(MaterialType)
    material = graphene.Field(MaterialType, id=graphene.Int(required=True))

    def resolve_materials(root, info):
        return Material.objects.all()

    def resolve_material(root, info, id):
        try:
            return Material.objects.get(id=id)
        except Material.DoesNotExist:
            return None


    colors = graphene.List(ColorType)
    color = graphene.Field(ColorType, id=graphene.Int(required=True))
    
    def resolve_colors(root, info):
        return Color.objects.all()

    def resolve_color(root, info, id):
        try:
            return Color.objects.get(id=id)
        except Color.DoesNotExist:
            return None

    
    suppliers = graphene.List(SupplierType)
    supplier = graphene.Field(SupplierType, id=graphene.Int(required=True))
    
    def resolve_suppliers(root, info):
        return Supplier.objects.all()

    def resolve_Supplier(root, info, id):
        try:
            return Supplier.objects.get(id=id)
        except Supplier.DoesNotExist:
            return None


    # molds = graphene.List(MoldType)
    # mold = graphene.Field(MoldType, id=graphene.Int(required=True))

    # def resolve_molds(root, info):
    #     return Mold.objects.all()

    # def resolve_mold(root, info, id):
    #     try:
    #         return Mold.objects.get(id=id)
    #     except Mold.DoesNotExist:
    #         return None


    # machines = graphene.List(MachineType)
    # machine = graphene.Field(MachineType, id=graphene.Int(required=True))

    # def resolve_machines(root, info):
    #     return Machine.objects.all()

    # def resolve_machine(root, info, id):
    #     try:
    #         return Machine.objects.get(id=id)
    #     except Machine.DoesNotExist:
    #         return None

schema = graphene.Schema(query=Query)