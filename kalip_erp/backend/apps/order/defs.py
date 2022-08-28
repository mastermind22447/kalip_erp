from graphene_django import DjangoObjectType
import graphene
from .models import Order, OrderProducts, OrderComMaterial


class OrderProductsType(DjangoObjectType):
    class Meta:
        model = OrderProducts
        fields = "__all__"

class OrderType(DjangoObjectType):
    image_url = graphene.String()
    status_title = graphene.String()
    class Meta:
        model = Order
        fields = "__all__"

class OrderInput(graphene.InputObjectType):    
    json_str = graphene.JSONString()



class OrderComMaterialType(DjangoObjectType):
    class Meta:
        model = OrderComMaterial
        fields = "__all__"