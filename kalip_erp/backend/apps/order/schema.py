from datetime import datetime
from multiprocessing.spawn import import_main_path
import re
import graphene

from .models import *
from .defs import *
import json
from default import utils
from apps.order import lib
from pprint import pprint
from django.db.models import Count

class Query(graphene.ObjectType):
    orders = graphene.List(OrderType)
    order = graphene.Field(OrderType, id=graphene.Int(required=True))

    ocom_material = graphene.List(OrderProductsType)
    order_product = graphene.Field(OrderProductsType, id=graphene.Int(required=True))
    order_products = graphene.List(OrderProductsType, orderId=graphene.Int(required=False), depId=graphene.Int(required=False), groupBy=graphene.String(required=False))

    order_com_materials = graphene.List(OrderComMaterialType)
    order_com_material = graphene.Field(OrderComMaterialType, id=graphene.Int(required=True))

    def resolve_orders(root, info, **kwargs):
        
        return Order.objects.all()

    def resolve_order(root, info, id):
        try:
            return Order.objects.get(id=id)
        except Order.DoesNotExist:
            return None

    def resolve_order_products(root, info, **kwargs):

        # where = ""
        
        # # results = OrderProducts.objects.raw("select * from order_orderproducts group by product_id")
        # results = OrderProducts.objects.all()

        # if 'depId' in kwargs:
        #     results = results.filter(product__department_id=kwargs['depId'])   
        
        # # if 'groupBy' in kwargs:
        # #     results = (
        # #         results.values(kwargs['groupBy'])
        # #         .annotate(dcount=Count(kwargs['groupBy']))
        # #         .order_by()
        # #     )
        
        # print(results.query)
        # # if 'depId' in kwargs:
        # #     results.filter()

        # return results

        depId = kwargs['depId']
        if depId is not None:
            return OrderProducts.objects.filter(product__department_id=depId)    
        return OrderProducts.objects.all()

    def resolve_order_product(root, info, id):
        try:
            return OrderProducts.objects.get(id=id)
        except OrderProducts.DoesNotExist:
            return None
    
    def resolve_order_com_materials(root, info, **kwargs):
        return OrderProducts.objects.all()

    def resolve_order_com_material(root, info, id):
        try:
            return OrderProducts.objects.get(id=id)
        except OrderProducts.DoesNotExist:
            return None

class NewOrder(graphene.Mutation):
    class Arguments:
        order_data = graphene.String()

    ok = graphene.Boolean()

    

    @staticmethod
    def mutate(root, info, order_data=None):
        # auth_header = info.context.META.get('HTTP_AUTHORIZATION')
        # payload = verify_token(auth_header)
        # user_id = payload['uid']

        order_data = utils.str_to_json(order_data)
        
        # Insert Order data
        new_order_id = lib.insert_order(order_data)
        # new_order_id = '321654'
       
        # Insert OrderProducts data
        lib.insert_order_products(new_order_id, order_data)
        
        #Insert OrderComMaterial data
        lib.insert_order_commaterial(new_order_id, order_data)


        # print(order_data)
        return NewOrder(ok=True)


class Mutation(graphene.ObjectType):
    new_order = NewOrder.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)