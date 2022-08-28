from django.urls import path
from django.urls import include, path
from . import views

urlpatterns = [
    # path('book/', include('neoapps.book.urls')),    

    path('', views.node_labels, name='node-labels-list'),
    path('<str:app>/<str:model>/', views.neomodel_list_view, name='neomodel-list'),
    path('<str:app>/<str:model>/<str:node_id>/change/', views.neomodel_change_view, name='neomodel-change'),
    path('<str:app>/<str:model>/add/', views.neomodel_change_view, name='neomodel-add'),
]