from multiprocessing.spawn import import_main_path
import graphene
import json 

from .models import *
from .defs import *
from pprint import pprint
from default import utils



class Query(graphene.ObjectType):
    products = graphene.List(ProductType, parentId=graphene.Int())
    product = graphene.Field(ProductType, id=graphene.Int(required=True))

    departments = graphene.List(DepartmentType)
    department = graphene.Field(DepartmentType, id=graphene.Int(required=True))

    product_com_materials = graphene.List(ProductComMaterialType)
    product_com_material = graphene.Field(ProductComMaterialType, id=graphene.Int(required=True))

    def resolve_products(root, info, **kwargs):
        parentId = kwargs.get('parentId')
        if parentId is not None:
            if parentId == 0:
                return Product.objects.filter(parent_id=None)
            return Product.objects.filter(parent_id=parentId)
        return Product.objects.all()

    def resolve_product(root, info, id):
        try:
            return Product.objects.get(id=id)
        except Product.DoesNotExist:
            return None

    def resolve_departments(root, info):
        return Department.objects.all()

    def resolve_department(root, info, id):
        try:
            return Department.objects.get(id=id)
        except Department.DoesNotExist:
            return None


    def resolve_product_com_materials(root, info):
        return ProductComMaterial.objects.all()

    def resolve_product_com_material(root, info, id):
        try:
            return ProductComMaterial.objects.get(id=id)
        except Department.DoesNotExist:
            return None

class NewProduct(graphene.Mutation):
    class Arguments:
        order_data = graphene.String()

    ok = graphene.Boolean()

    @staticmethod
    def mutate(root, info, order_data=None):
        
        order_data = utils.str_to_json(order_data)

        return NewProduct(ok=True)


class Mutation(graphene.ObjectType):
    add_product = NewProduct.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)