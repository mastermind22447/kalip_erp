from multiprocessing.spawn import import_main_path
import graphene

from .models import *
from .defs import *

class Query(graphene.ObjectType):
    companies = graphene.List(CompanyType)
    company = graphene.Field(CompanyType, companyId=graphene.Int(required=True))

    def resolve_companies(root, info, **kwargs):
        return Company.objects.all()

    def resolve_company(root, info, companyId):
        try:
            return Company.objects.get(pk=companyId)
        except Company.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)