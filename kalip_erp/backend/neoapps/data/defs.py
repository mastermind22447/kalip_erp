import graphene

class UnitType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()

class MaterialType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    code = graphene.String()
    alarm_inventory = graphene.Int()
    unit = graphene.List('neoapps.data.defs.UnitType')
    technical_detail = graphene.String()
    security_detail = graphene.String()


