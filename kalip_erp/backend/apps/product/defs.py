from graphene_django import DjangoObjectType
import graphene
from .models import Product, Department, ProductComMaterial

class ProductType(DjangoObjectType):
    # semi_products = graphene.List(lambda: ProductType)
    image_url = graphene.String()
    class Meta:
        model = Product
        fields = "__all__"

class DepartmentType(DjangoObjectType):
    class Meta:
        model = Department
        fields = "__all__"

class ProductComMaterialType(DjangoObjectType):
    class Meta:
        model = ProductComMaterial
        fields = "__all__"

class ProductInput(graphene.InputObjectType):    
    json_str = graphene.JSONString()
