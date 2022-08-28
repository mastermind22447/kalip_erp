import graphene
# import neoapps.data.schema
# import neoapps.user.schema
import apps.data.schema
import apps.company.schema
import apps.product.schema
import apps.order.schema
import apps.warehouse.schema
import apps.maintenance.schema
import apps.machine.schema
import apps.mold.schema
import default.schema

import graphql_jwt

class Query(
    # neoapps.data.schema.Query,
    # neoapps.user.schema.Query,
    apps.data.schema.Query,
    apps.company.schema.Query,
    apps.product.schema.Query,
    apps.warehouse.schema.Query,
    apps.maintenance.schema.Query,
    apps.machine.schema.Query,
    apps.mold.schema.Query,
    apps.order.schema.Query,
    default.schema.Query,
    

    
    graphene.ObjectType
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(
        apps.product.schema.Mutation, 
        apps.order.schema.Mutation, 
        graphene.ObjectType
        ):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()

#     verify_token = graphql_jwt.Verify.Field()
#     refresh_token = graphql_jwt.Refresh.Field()
#     # This class will inherit from multiple Queries
#     # as we begin to add more apps to our project


schema = graphene.Schema(query=Query, mutation=Mutation)
# schema = graphene.Schema(query=Query)
