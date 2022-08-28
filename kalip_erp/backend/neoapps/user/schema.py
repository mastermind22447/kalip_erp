from django.contrib.sites.shortcuts import get_current_site
from django.contrib.sites.models import Site
import datetime
import graphene
from graphene_django.types import DjangoObjectType
from graphene.types.generic import GenericScalar
from neoapps.user.models import Permission, Group, User

from neoapps.user.defs import PermissionInput, PermissionType, UserType, UserInput, GroupType, InputFactory


from graphene.types.resolver import dict_resolver
import graphql
from django.http import JsonResponse
import json
from django.conf import settings

from neomodel import Traversal

from neomodel_admin import utils

from neomodel import db
from neomodel import Traversal, Q
from django.contrib.auth.hashers import make_password
import jwt
from neoapps.user.validators import validate_create_user, validate_login
from neoapps.user.utils import generate_token, verify_token
from django.contrib.auth.hashers import check_password
import inspect
from datetime import datetime


TestInput = InputFactory('TestInput', Permission, "a b c".split())


class Query(graphene.ObjectType):
    users = graphene.List(UserType, groupTitle=graphene.String())
    gorups = graphene.List(GroupType)
    permissions = graphene.List(PermissionType)

    user = graphene.Field(UserType, id=graphene.Int(),
                          slug=graphene.String())
    group = graphene.Field(GroupType, id=graphene.Int())
    permission = graphene.Field(PermissionType, id=graphene.Int())

    def resolve_user(self, info, **kwargs):

        id = kwargs.get('id')
        if id is not None:
            user = User.nodes.get_or_none(id=id)
            return user

        slug = kwargs.get('slug')
        if slug is not None:
            user = User.nodes.get_or_none(slug=slug)
            return user

        id = kwargs.get('id')
        if id is not None:
            user = utils.get_by_id(User, id)
            return user

    def resolve_users(self, info, **kwargs):

        group_title = kwargs.get('groupTitle')
        if group_title is not None:
            query = f"MATCH (g:Group{{title:'{group_title}'}})<-[:`IN_GROUP`]-(user) RETURN user"
            relations = utils.ex_query(User, query)
            return relations
        users = User.nodes.all()
        return users

    def resolve_group(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            group = utils.get_by_id(Group, id)
            return group

    def resolve_groups(self, info, **kwargs):
        groups = Group.nodes.all()
        return groups

    def resolve_permission(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            permission = utils.get_by_id(Permission, id)
            return permission

    def resolve_permissions(self, info, **kwargs):
        permissions = Permission.nodes.all()
        return permissions




class CreatePermission(graphene.Mutation):
    class Arguments:

        input = PermissionInput(required=True)

    ok = graphene.Boolean()
    permission = graphene.Field(PermissionType)

    @staticmethod
    def mutate(root, info, input=None):
        ok = True
        perm_instance = Permission(name=input.name)
        perm_instance.save()
        return CreatePermission(ok=ok, permission=perm_instance)


class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    ok = graphene.Boolean()
    token = graphene.String()
    user = graphene.Field(UserType)
    errors = graphene.String()

    @staticmethod
    def mutate(root, info, input=None):
        # TODO Store token

        errors, valid = validate_create_user(input)
        if not valid:
            raise Exception(errors)
        ok = valid
        user_instance = User(mobile=input.mobile)
        user_instance.password = make_password(input.password)
        user_instance.save()
        token = generate_token(user_instance)
        print(token)
        return CreateUser(ok=ok, errors=errors, token=token, user=user_instance)


class LoginInput(graphene.InputObjectType):
    mobile = graphene.String()
    password = graphene.String()


class LoginUser(graphene.Mutation):
    class Arguments:
        input = LoginInput(required=True)

    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, input=None):

        errors, valid = validate_login(input)
        if not valid:
            raise Exception(errors)

        user = User.nodes.get_or_none(mobile=input.mobile)

        if user is None:
            errors['general'] = 'Wrong crendetials.'
            raise Exception(errors)

        if not check_password(input.password, user.password):
            errors['general'] = 'Wrong crendetials'
            raise Exception(errors)

        token = generate_token(user)

        check = verify_token(token)

        ok = True

        return LoginUser(ok=ok, token=token, user=user)


class Mutation(graphene.ObjectType):
    create_permission = CreatePermission.Field()
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()
    


schema = graphene.Schema(query=Query, mutation=Mutation)
