from django.shortcuts import render
from django.views.generic import TemplateView
from .models import Workflow
from django.contrib.auth import get_permission_codename
from django.utils.translation import gettext_lazy as _

class DetailView(TemplateView):
    model = Workflow
    template_name = "admin/detail.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        wf = Workflow.objects.get(id=context['id'])
        
        model_admin = self.kwargs['model_admin']
        opts = model_admin.model._meta
        admin_site = model_admin.admin_site
        has_perm = self.request.user.has_perm(opts.app_label + '.' + get_permission_codename('change', opts))
        context.update({
            'admin_site': admin_site.name,
            'title': _("Workflow"),
            'opts': opts,
            'app_label': opts.app_label,
            'has_chage_permission': has_perm,
            'wf': wf,
        })

        return context
    

detail_view = DetailView.as_view()