from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.admin.views.decorators import staff_member_required
from django.template import RequestContext
import inspect
from django.contrib import admin
from django.contrib.admin import helpers, widgets
from django.utils.text import capfirst
from neomodel import Traversal, Q
from django import forms
import importlib
from .forms import props, BaseNeoModelForm
from django.forms.models import ModelForm, ModelFormMetaclass
from django.urls import reverse
import uuid
from neomodel import db
import time
import os
from datetime import datetime
from django.template.defaultfilters import slugify


class NeoAdminModel:

    Model = None
    model = None
    module_name = None
    app = None
    app_base_url = None
    
    def __init__(self, request, app = None, model = None, node_id = None):
        self.model = model
        self.app = app
        self.request = request
        self.node_id = node_id
        self.app_base_url = reverse('neomodel-list', kwargs={'app': app, 'model': model})

        if app is not None:
            self._init_module()

        self._init_context()

    def _init_module(self):
        self.Model = f"{self.model}".capitalize()
        self.module_name = f"neoapps.{self.app}.models"
        self.module = importlib.import_module(self.module_name)
        self.class_ = getattr(self.module, self.Model)

    def get_by_list(self, class_, node_ids):
        """
        Return list of nodes instances by neo4j generated ids
        """
        list_ids = []
        for node_id in node_ids:
            list_ids.append(int(node_id))
        Model = getattr(class_, '__label__')
        query = "MATCH (n:%s) WHERE id(n) in %s return n" % (Model, list_ids)
        results, meta = db.cypher_query(query, {})
        model_instances = [class_.inflate(row[0]) for row in results]
        return model_instances

    def get_by_id(self, class_, node_id):
        """
        Get node by neo4j generated id
        """
        Model = getattr(class_, '__label__')
        query = "MATCH (n:%s) WHERE id(n) = %s return n" % (Model, node_id)
        results, meta = db.cypher_query(query, {})
        model_instance = [class_.inflate(row[0]) for row in results][0]
        return model_instance

    def _init_context(self):
        
        self.context = {
            "site_title":"Medadika Admin Portal",
            "site_header":"Medadika administration",
            "site_url":"/",
            "has_permission":True,
            "is_popup":False,
            "module_name":f"{self.Model}s",
            "object_name": self.Model,
            "selection_note":"0 of 2 selected",
            "selection_note_all":"All 2 selected",
            "title":f"Select {self.Model}s to change",
            "to_field":"None",
            "has_add_permission":True,
            "actions_on_top":True,
            "actions_on_bottom":True,
            "actions_selection_counter":True,
            "preserved_filters": "",
            "has_file_field": True,
            "url": f"/admin/neomodel/{self.app}/{self.model}/",
            }

    def _new_file_name(self, f):
        """
        Return new file name by timestamp added
        """
        file_name, file_ext = os.path.splitext(str(f))
        timestamp = str(time.time()).replace(".", "-")
        return f"{file_name}-{timestamp}{file_ext}"

    def handle_uploaded_file(self, model_instance, field, f):
        
        new_file_name = self._new_file_name(f)

        upload_to = getattr(getattr(type(model_instance), field), 'upload_to')
        path = f"media/{upload_to}/{new_file_name}"

        destination = open(path, 'wb+')
        for chunk in f.chunks():
            destination.write(chunk)
        destination.close()

        setattr(model_instance, field, new_file_name)

    def _add_datetime_fields(self, model_instance, field_list):
        """
        Add DateTime field if its exist in reques.POST
        """
        for model_field in type(model_instance).__dict__:
            if type(type(model_instance).__dict__[model_field]).__name__ == 'DateTimeProperty':
                date = field_list[f"{model_field}_0"]
                time = field_list[f"{model_field}_1"]
                if date is not None and date != '':
                    res = datetime.strptime(f"{date} {time}", '%Y-%m-%d %H:%M:%S')
                    field_list[model_field] = str(res)
                

        return field_list
        
    def _save_node(self, model_instance, post, files=None):
        
        field_list = post.copy()

        if files is not None:
            for sfile in files:
                self.handle_uploaded_file(model_instance, sfile, files[sfile])

        field_list = self._add_datetime_fields(model_instance, field_list)
                
        for field in field_list:
            if hasattr(model_instance, field):
                field_property = getattr(type(model_instance), field).__class__.__name__

                values = field_list.getlist(f"{field}")

                val = values[0]

                if field_property == 'FloatProperty':
                    if val is None or val == '':
                        val = None
                        
                if field_property == 'DateProperty':
                    if val is not None and val != '':
                        val = datetime.strptime(val, '%Y-%m-%d').date()
                    else: 
                        val = None

                if field_property == 'DateTimeProperty':
                    if val is not None and val != '':
                        val = datetime.strptime(val, '%Y-%m-%d %H:%M:%S')
                    else: 
                        val = None

                obj = getattr(model_instance, field)
                
                if field_property != 'ImageProperty':
                    setattr(model_instance, field, val)
                    model_instance.save()

                    if hasattr(obj, 'definition'):
                        rel_model = getattr(obj, 'definition')
                        rel_class = rel_model['node_class']
                        rel_instance = self.get_by_id(rel_class, val)


                        direction = getattr(type(model_instance), field).__dict__['definition']['relation_type']


                        definition = dict(node_class=rel_class, direction=direction,
                                    relation_type=None, model=None)

                        relations_traversal = Traversal(model_instance, getattr(rel_class, '__label__'), definition)

                        relations = relations_traversal.all()
                        if getattr(type(model_instance), field).__dict__['manager'].description.find("more") > 0:
                            obj.disconnect_all()
                            for val in values:
                                rel_instance = self.get_by_id(rel_class, val)
                                obj.connect(rel_instance)
                            model_instance.save()
                            print("Save1")
                        else:
                            if not obj.is_connected(rel_instance):
                                pass
                                if len(relations) > 0:                        
                                    obj.reconnect(obj[0], rel_instance)
                                    model_instance.save()
                                    print("Save2")
                                else:
                                    obj.connect(rel_instance)
                                    a = model_instance.save()
                                    print(a)

        if  '_save' in post:
            return HttpResponseRedirect(self.app_base_url)

        if  '_continue' in post:
            return HttpResponseRedirect(f"{self.app_base_url}{model_instance.id}/change/")

        if  '_addanother' in post:
            return HttpResponseRedirect(f"{self.app_base_url}add/")

        
    def list_nodes(self):
     
        app_list = []
        
        admin_apps = {
            'data' : ('unit'),
            # 'book' : ('book','stage'),
            # 'author' : ('author',),
            # 'common' : ('language','country', 'category'),
            # 'reserve' : ('hour',)
        }
        for app in admin_apps:

            app_models = []
            for model in admin_apps[app]:
                model_dict = {
                                'name': f'{capfirst(model)}s', 
                                'object_name': f'{capfirst(model)}', 
                                'perms': {'add': True, 'change': True, 'delete': True, 'view': True}, 
                                'admin_url': f'/admin/neomodel/{app}/{model}/', 
                                'add_url': f'/admin/neomodel/{app}/{model}/add/', 
                                'view_only': False
                            }
                app_models.append(model_dict)
            
            appd_dict = {
                    'name': f'{capfirst(app)}s', 
                    'app_label': f'{app}s', 
                    'app_url': f'/admin/neomodel/{app}/', 
                    'has_module_perms': True, 
                    'models': app_models
                    }
            app_list.append(appd_dict)
                
        self.context['app_list'] = app_list
        self.context['title'] = 'Node labels administration'

        r = render(self.request, 'neomodel_admin/node_labels.html', self.context)
        return HttpResponse(r)


    def _delete_nodes(self):
        selected = self.request.POST.getlist(helpers.ACTION_CHECKBOX_NAME)
        for item in selected:
            node = self.get_by_id(self.class_, item)
            node.delete()
            return HttpResponseRedirect(self.request.get_full_path())
        
    def _delete_nodes_confirm(self):
        
        node_ids = self.request.POST.getlist(helpers.ACTION_CHECKBOX_NAME)

        data = []
        total_count = {}
        relation_list = []

        nodes = self.get_by_list(self.class_, node_ids)
        
        node_label = getattr(nodes[0], '__label__')

        total_count[node_label] = len(nodes)

        for node in nodes:
            
            query = "MATCH (n:%s )-[r]-(b) WHERE id(n) = %s RETURN r, n, b" % (self.Model, node.id)
            results, meta = db.cypher_query(query, {})

            relation_list = []
            
            for row in results:
                index = f"{list(row[1].labels)[0]}-{list(row[2].labels)[0]}-({row[0].type}) relationships"
                rel_list = f"{list(row[1].labels)[0]}-{list(row[2].labels)[0]}-({row[0].type}) relationship ({row[2].id})"

                if index in total_count:
                    total_count[index] += 1
                else:
                    total_count[index] = 1

                
                relation_list.append(rel_list)
            
            data.append(
                {
                    'node':
                        {
                        'label': getattr(node, '__label__'), 
                        'data': node
                        }, 
                    'results': results, 
                    'relation_list': relation_list,
                    'app_name': node.__class__.__name__.lower(),
                    'model_name': node.__class__.__module__.split(".")[-2].lower(),
                })



        self.context['data'] = data
        self.context['total_count'] = total_count
        self.context['model'] = self.Model
        self.context['title'] = 'Are you sure?'
        # self.context['u_ids'] = u_ids
        
        r = render(self.request, 'neomodel_admin/neomodel_delete_selected_confirmation.html', self.context)
        return HttpResponse(r)

    def list_view(self):
        """
        Return list form of nodes
        """

        selected = self.request.POST.getlist(helpers.ACTION_CHECKBOX_NAME)

        if (self.request.method == 'POST' and
                helpers.ACTION_CHECKBOX_NAME in self.request.POST and
                'index' not in self.request.POST and '_save' not in self.request.POST):
            if selected:
                return self._delete_nodes()


        if (self.request.POST.get('action') is not None and 
                self.request.POST.get('action') == 'delete_selected' and
                'index' in self.request.POST):
            return self._delete_nodes_confirm()

        results = self.class_.nodes.all()

        self.context["results"] = results


        r = render(self.request, 'neomodel_admin/neomodel_change_list.html', self.context)
        return HttpResponse(r)


    def change_view(self):
        """
        Return change form of node
        """

        self.context['title'] = f'Change {capfirst(self.model)}'
        
        action = ''
        if self.node_id:

            
            model_instance = self.get_by_id(self.class_, self.node_id)


            if self.request.POST:
                action = 'update'
                return self._save_node(model_instance, self.request.POST, self.request.FILES or None)
            else:
                action = 'edit'
        else:
            model_instance = None
            if self.request.method == 'POST':
                model_instance = self.class_()
                action = 'insert'
                
                return self._save_node(model_instance, self.request.POST, self.request.FILES or None)
            else:
                action = 'add'
            
        MyForm = forms.modelform_factory(self.class_, form=BaseNeoModelForm)
        form = MyForm(self.request.POST or None, self.request.FILES or None, instance = model_instance, neomodel=self.class_, action=action)

        self.context['result'] = model_instance
        self.context['form'] = form

        r = render(self.request, 'neomodel_admin/neomodel_change_form.html', self.context)
        return HttpResponse(r)