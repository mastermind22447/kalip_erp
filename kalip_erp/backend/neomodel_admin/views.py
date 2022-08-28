from django.contrib.admin.views.decorators import staff_member_required
from .options import NeoAdminModel
       
@staff_member_required
def node_labels(request): 
    adminModel = NeoAdminModel(request)
    return adminModel.list_nodes()
    

@staff_member_required
def neomodel_list_view(request, app, model):
    adminModel = NeoAdminModel(request, app, model)
    return adminModel.list_view()


@staff_member_required
def neomodel_change_view(request, app, model, node_id = None): 
    adminModel = NeoAdminModel(request, app, model, node_id)
    return adminModel.change_view()

@property
def media(self):
    response = super().media
    response._js_lists.append(["/js/en/leaflet.bundle.js"])
    return response