from graphene_django import DjangoObjectType
import graphene
from .models import Company

class CompanyType(DjangoObjectType):
    class Meta:
        model = Company
        fields = "__all__"
