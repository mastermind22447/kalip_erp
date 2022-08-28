from neomodel import StructuredNode, StructuredRel,IntegerProperty, UniqueIdProperty, FloatProperty, BooleanProperty, AliasProperty, StringProperty, DateProperty, DateTimeProperty, RelationshipFrom, RelationshipTo, One, OneOrMore, ZeroOrMore
from django_neomodel import DjangoNode
from django.utils.translation import gettext_lazy as _

from neomodel_admin.widgets import CKEditorProperty, TextareaProperty, ImageProperty, SlugProperty
from django.contrib.sites.shortcuts import get_current_site


class Supplier(DjangoNode):
    name = StringProperty(max_length=200, verbose_name=_("Supplier name"))
    addres = StringProperty(max_length=200, verbose_name=_("address"))
    telephone = StringProperty(max_length=200, verbose_name=_("telephone"))

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Supplier")
        verbose_name_plural = _("Suppliers")

class Unit(DjangoNode):
    id = UniqueIdProperty()
    name = StringProperty(max_length=200, verbose_name=_("Unit"))

    material = RelationshipFrom('neoapps.data.models.Material','BASED_ON', cardinality=One)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _("Unit")
        verbose_name_plural = _("Units")
        app_label = _('Data')

class Material(DjangoNode):
    id = UniqueIdProperty()
    code = StringProperty(max_length=20, verbose_name=_("Material code"))
    name = StringProperty(max_length=200, verbose_name=_("Material name"))
    alarm_inventory = IntegerProperty(verbose_name=_("Alarm inventory"))
    technical_detail = CKEditorProperty(verbose_name=_("Technical detail"))
    security_detail = CKEditorProperty(verbose_name=_("Security detail"))
    unit = RelationshipTo('neoapps.data.models.Unit','BASED_ON', cardinality=One)

    def __str__(self):
        return self.name

    __unicode__ = __str__

    class Meta:
        verbose_name = _("Raw material")
        verbose_name_plural = _("Raw materials")
        app_label = _('Data')

