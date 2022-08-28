from neomodel import StructuredNode, StructuredRel, UniqueIdProperty, StringProperty, DateTimeProperty, RelationshipFrom, RelationshipTo, One, OneOrMore
from django_neomodel import DjangoNode
from django.utils.translation import gettext_lazy as _

from django.forms import Widget, ClearableFileInput, DateInput, TextInput
from django.template.loader import render_to_string
from django.utils.safestring import mark_safe
from django.db.models.fields.files import ImageFieldFile, FileField
from django.db.models.fields import (
    DateField, DateTimeField, DurationField, Field, IntegerField, TimeField,
)

class CKEditorProperty(StringProperty):
    form_field_class = 'TextField'

class TextareaProperty(StringProperty):
    form_field_class = 'TextField'

class FileProperty(StringProperty):
    form_field_class = 'TextField'

class ImageProperty(StringProperty):
    form_field_class = 'TextField'
    choices = None
    max_length = None
    upload_to = None
    def __init__(self, upload_to=None, help_text=None, attrs=None):
        super().__init__(attrs)
        self.upload_to = upload_to

    @property
    def sina(self):
        return "ssssss"

class SlugProperty(StringProperty):
    form_field_class = 'TextField'
    def __init__(self, to=None, attrs=None):
        self.to = to
        if attrs is not None:
            attrs = attrs.copy()
            self.input_type = attrs.pop('type', self.input_type)
        super().__init__(attrs)



class NeoModelSlug(TextInput):
    template_name = 'neomodel_admin/widgets/slug_input.html'

    def __init__(self, instance=None, attrs=None, to = None):
        self.instance = instance
        self.to = to
        super().__init__(attrs)

    def get_context(self, name, value, attrs):
        to = getattr(getattr(type(self.instance), name), 'to')
        context = super().get_context(name, value, attrs)
        context['widget']['to'] = to
        return context

    

class NeoModelImage(ClearableFileInput):
    template_name = 'neomodel_admin/widgets/clearable_file_input.html'

    def __init__(self, instance=None, attrs=None):
        self.instance = instance
        super().__init__(attrs)
        
    def get_context(self, name, value, attrs):

        path = getattr(getattr(type(self.instance), name), 'upload_to')
        context = super().get_context(name, value, attrs)
        if value != '' and value is not None:

            new_value = ImageFieldFile(instance=None, field=FileField(),
                                name=value)

            
            url = getattr(new_value, 'url')
            file_url =url.replace("media/", f"media/{path}/")
            
            # setattr(new_value, 'url', url.replace("media/", f"media/{path}/"))
        
            context['widget']['is_initial'] = True
            context['widget']['value'] = new_value
            context['widget']['required'] = False
            context['widget']['file_url'] = file_url
        # else:
        #     context['widget']['is_initial'] = True
        #     context['widget']['value'] = None
        #     context['widget']['required'] = False
        #     context['widget']['file_url'] = ''
        return context