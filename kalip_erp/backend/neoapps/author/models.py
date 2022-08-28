from neomodel import StructuredNode, StructuredRel, UniqueIdProperty, FloatProperty, BooleanProperty, AliasProperty, StringProperty, DateProperty, DateTimeProperty, RelationshipFrom, RelationshipTo, One, OneOrMore
from django_neomodel import DjangoNode
from django.utils.translation import gettext_lazy as _

from neomodel_admin.widgets import CKEditorProperty, TextareaProperty, ImageProperty, SlugProperty
from django.contrib.sites.shortcuts import get_current_site

class Author(DjangoNode):
    uid = UniqueIdProperty()
    full_name = StringProperty(max_length=150)
    slug = SlugProperty(to='full_name')    
    specialty = StringProperty(max_length=150)
    bio = CKEditorProperty(help_text='textarea')
    big_image = ImageProperty(upload_to='authors')
    image = ImageProperty(upload_to='authors')
    birth_date = DateProperty()
    register_date = DateTimeProperty()
    is_important = BooleanProperty()
    degree = FloatProperty()

    book = RelationshipFrom('neoapps.book.models.Book', 'BELONGS_TO', cardinality=One)
    
    user = RelationshipTo('neoapps.user.models.User', 'OWNER', cardinality=One)
    country = RelationshipTo('neoapps.common.models.Country', 'LIVES_IN', cardinality=One)
    language = RelationshipTo('neoapps.common.models.Language', 'CAN_SPEAK', cardinality=OneOrMore)

    @property
    def image_url(self):
        upload_to = getattr(getattr(type(self), 'image'), 'upload_to')
        domain = get_current_site(None).domain
        return f'http://{domain}/media/{upload_to}/{self.image}'

    class Meta:
        verbose_name = _("Neo Author")
        verbose_name_plural = _("Neo Authors")
        app_label = _('Library')

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return "/people/%i/" % self.id


    

