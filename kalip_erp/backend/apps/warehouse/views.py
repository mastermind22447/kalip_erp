from django.shortcuts import render
from django.views.generic import TemplateView


class DetailView(TemplateView):
    template_name = "detail.html"

detail_view = DetailView.as_view()