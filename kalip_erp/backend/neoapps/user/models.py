from neomodel import StructuredNode, StructuredRel, UniqueIdProperty, FloatProperty, BooleanProperty, AliasProperty, StringProperty, DateProperty, DateTimeProperty, IntegerProperty, EmailProperty, RelationshipFrom, RelationshipTo, Relationship, One, OneOrMore, ZeroOrMore, ZeroOrOne
from django_neomodel import DjangoNode
from django.utils.translation import gettext_lazy as _

from neomodel_admin.widgets import CKEditorProperty, TextareaProperty, ImageProperty, SlugProperty
from django.contrib.sites.shortcuts import get_current_site
from django.apps import apps
from importlib import import_module


class User(DjangoNode):
    #TODO Set created_at default to now
    #TODO change mobile to phone

    FEMALE = 'F'
    MALE = 'M'
    OTHER = 'O'
    GENDERS = [
        (FEMALE, 'Female'),
        (MALE, 'Male'),
        (OTHER, 'Other'),
    ]

    id = UniqueIdProperty()
    first_name = StringProperty(max_length=30)
    last_name = StringProperty(max_length=150)
    gender = StringProperty(choices=GENDERS)
    full_name = StringProperty(max_length=150)
    user_id = IntegerProperty(index=True, default=0)
    email = EmailProperty()
    mobile = StringProperty(max_length=150)
    # username = StringProperty(max_length=150, unique=True)

    slug = SlugProperty(to='full_name')
    specialty = StringProperty(max_length=150)
    bio = CKEditorProperty(help_text='textarea')
    big_image = ImageProperty(upload_to='users')
    image = ImageProperty(upload_to='users')
    birth_date = DateProperty()
    register_date = DateTimeProperty()
    is_important = BooleanProperty()

    password = StringProperty(max_length=300)

    group = RelationshipTo('neoapps.user.models.Group','IN_GROUP', cardinality=ZeroOrMore)
    permission = RelationshipTo('neoapps.user.models.Permission', 'HAS_PERM', cardinality=ZeroOrMore)

    USERNAME_FIELD = 'mobile'

    

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        app_label = _('Kerp')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_class(self, class_path):
        module_path, class_name = class_path.rsplit('.', 1)
        module = import_module(module_path)
        return getattr(module, class_name)

    @property
    def image_url(self):
        if self.image != None:
            upload_to = getattr(getattr(type(self), 'image'), 'upload_to')
            domain = get_current_site(None).domain
            return f'http://{domain}/media/{upload_to}/{self.image}'
        return ''

    def get_username(self):
        return self.mobile.encode().decode()


class Group(DjangoNode):
    id = UniqueIdProperty()
    title = StringProperty(max_length=255)

    permission = RelationshipTo('neoapps.user.models.Permission', 'HAS_PERM', cardinality=ZeroOrMore)
    group = RelationshipTo('neoapps.user.models.Group','RELATED', cardinality=ZeroOrMore)

    class Meta:
        verbose_name = _("Group")
        verbose_name_plural = _("Groups")
        app_label = _('Library')

    def __str__(self):
        return self.title


class Permission(DjangoNode):
    id = UniqueIdProperty()
    name = StringProperty(max_length=100)
    codename = StringProperty(max_length=100)

    class Meta:
        verbose_name = _('Permission')
        verbose_name_plural = _('Permissions')
        app_label = _('Library')

    def __str__(self):
        return self.name
