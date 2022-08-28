from django.contrib import admin
from .models import Workflow
from django.utils.translation import gettext_lazy as _
from .views import detail_view
from django.urls import path
from django.utils.html import format_html

@admin.register(Workflow)
class WorkflowAdmin(admin.ModelAdmin):
    list_display = ("order", "started_at", "product", "machine", "mold", "product_type", 'detail_link')
    ordering = ["-created_at",]
    search_fields = ['order__id',]
    autocomplete_fields = ['mold', 'machine', 'order', 'color', 'machine_operator', 'quality_control']

    def product_type(self, obj):
        return obj.product.product_type
    product_type.short_description = _("Type")

    def detail_link(self, obj):
        return format_html(f'<a href="/admin/workflow/workflow/detail/{obj.id}/">{_("Detail")}</a>')
    detail_link.short_description = _("Detail")


    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('detail/<int:id>/', 
                self.admin_site.admin_view(detail_view),
                {'model_admin': self, 'app_label': 'workflow'},
                name="s_process"),
        ]
        return my_urls + urls

    
