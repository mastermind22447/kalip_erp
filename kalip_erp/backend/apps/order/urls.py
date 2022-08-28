# -*- encoding: utf-8 -*-

from django.urls import path, re_path
from apps.order import views

urlpatterns = [

    # New order
    path('new/', views.newOrder, name='new-order'),
]
