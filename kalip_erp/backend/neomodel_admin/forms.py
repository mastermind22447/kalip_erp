from django import forms

from neoapps.author.models import Author

from django.contrib import admin
from django.contrib.admin import helpers, widgets

from django.forms import BaseModelFormSet, BaseModelForm

from django.contrib.admin import ModelAdmin

from ckeditor.widgets import CKEditorWidget
from .widgets import NeoModelImage, NeoModelSlug
from datetime import datetime



def props(cls):   
  return [i for i in cls.__dict__.keys() if i[:1] != '_']

def import_class(name):
    components = name.split('.')
    mod = __import__(components[0])
    for comp in components[1:]:
        mod = getattr(mod, comp)
    return mod
    

def add_meta(form_class):
    class ModifiedForm(form_class):
        class Meta(form_class.Meta):
            model = Author
    return ModifiedForm

@add_meta
class BaseNeoModelForm(forms.ModelForm):

    class Meta:
        fields = '__all__'
        exclude = ['uid']

    class Media:
        css = {
            'screen': ('pretty.css',),
            'print': ('newspaper.css',)
        }
    
    def __init__(self, *args, **kwargs):
        self.neomodel = kwargs.pop('neomodel')
        self.action = kwargs.pop('action')
        super().__init__(*args, **kwargs)

        for field in self.fields:

            field_property = getattr(self.neomodel, field).__class__.__name__
            
            if field_property == 'StringProperty':
                choices = getattr(getattr(self.neomodel, field), 'choices')
                if choices is not None:
                    chs = []
                    for choice in choices:
                        chs.append((choice, choices[choice]))
                    self.fields[field].choices = chs
            elif field_property == 'CKEditorProperty':
                self.fields[field] = forms.CharField(widget=CKEditorWidget())

            elif field_property == 'TextareaProperty':
                self.fields[field] = forms.CharField(widget=widgets.AdminTextareaWidget())
                self.fields[field].widget.attrs.update({'class':'vLargeTextField'})
            elif field_property == 'ImageProperty':
                
                self.fields[field] = forms.ImageField(widget=NeoModelImage(self.instance))
            elif field_property == 'DateProperty':
                self.fields[field] = forms.DateField(widget=widgets.AdminDateWidget())
            elif field_property == 'DateTimeProperty':
                self.fields[field] = forms.DateField(widget=widgets.AdminSplitDateTime())
            elif field_property == 'BooleanProperty':
                self.fields[field] = forms.BooleanField()
            elif field_property == 'SlugProperty':
                self.fields[field] = forms.CharField(widget=NeoModelSlug(self.instance))
            else:
                self.fields[field].widget.attrs.update({'class':'vTextField'})
            
        for field in props(self.neomodel):
            
            if type(getattr(self.neomodel, field)).__name__ == "RelationshipDefinition":
                if getattr(self.neomodel, field).definition['direction']  == 1:

                    RelCalss = getattr(self.neomodel, field).definition['node_class']
                    
                    items = RelCalss.nodes.all()
                    rel_array = []
                    for item in items:
                        rel_array.append((item.id, item))

                    cardinality_description = getattr(self.neomodel, field).__dict__['manager'].description
                    if cardinality_description.find("more") > 0:
                        cardinality_widget = forms.SelectMultiple
                    else:
                        cardinality_widget = forms.Select

                    inital = self.get_initial_for_relation(field)

                    self.fields[field] = forms.MultipleChoiceField(
                        required=False,
                        widget=cardinality_widget,
                        choices=rel_array,
                        initial=inital,
                    )

    def get_initial_for_relation(self, field):
        """
        Return initial data for relation field on form. Use initial data from the form
        or the field, in that order.
        """
        if self.action == 'edit':
            inital_array = []
            if len(getattr(self.instance, field)) > 0:
                for init_value in getattr(self.instance, field):
                    inital_array.append(init_value.id)
            return inital_array
        return []
        
