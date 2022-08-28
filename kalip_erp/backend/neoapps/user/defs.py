import graphene
import inspect

def InputFactory(name, BaseNode, argnames, BaseClass = graphene.ObjectType):
    def __init__(self, *args, **kwargs):
        setattr(self, 'a', 123)
        
        BaseClass.__init__(self, name[:-len("Class")])

    # print(props)
    class_vars = {}
    props = inspect.getmembers(BaseNode, lambda a:not(inspect.isroutine(a)))
    for prop in props:
        if prop[0][0] != "_" and (prop[0] not in ('DoesNotExist','Meta', 'nodes', 'id', 'id')):
            # print(prop[0])
            # setattr(self, prop[0], prop[1])
            class_vars[prop[0]] = prop[1]
    new_class = type(name, (BaseClass, ), class_vars)
    props = inspect.getmembers(new_class, lambda a:not(inspect.isroutine(a)))
    # print(type(new_class))
    # print("------")
    # for prop in props:
    #     if prop[0][0] != "_" and (prop[0] not in ('DoesNotExist','Meta', 'nodes', 'id', 'id')):
    #         # print(prop[0])
    # print("------")
    # new_class.__dict__ = BaseClass.__dict__.copy()
    # new_class.__dict__.update(BaseClass.__dict__)
    return new_class

class PermissionType(graphene.ObjectType):
    id = graphene.ID()
    name = graphene.String()
    codename = graphene.String()


class PermissionInput(graphene.InputObjectType):
    name = graphene.String()
    codename = graphene.String()


class GroupType(graphene.ObjectType):
    id = graphene.ID()
    title = graphene.String()
    permissions = graphene.List(PermissionType)


class UserType(graphene.ObjectType):
    id = graphene.ID()

    first_name = graphene.String()
    last_name = graphene.String()
    full_name = graphene.String()
    slug = graphene.String()
    user_id = graphene.Int()
    email = graphene.String()
    mobile = graphene.String()
    username = graphene.String()
    gender = graphene.String()
    full_name = graphene.String()
    birth_date = graphene.Date()
    specialty = graphene.String()
    bio = graphene.String()
    big_image = graphene.String()
    image = graphene.String()
    image_url = graphene.String()

    group = graphene.List(GroupType)
    permissions = graphene.List(PermissionType)

    token = graphene.String()

class UserInput(graphene.InputObjectType):

    mobile = graphene.String()
    password = graphene.String()
    confirm_password = graphene.String()

