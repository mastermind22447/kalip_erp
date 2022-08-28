"""source URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import urls
from django.contrib import admin
from django.urls import include, path
from django.utils.translation import gettext_lazy as _
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/neomodel/', include('neomodel_admin.urls')),
    path('admin/', admin.site.urls),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    # path('api/data/', include('apps.data.urls')),
    path('i18n/', include('django.conf.urls.i18n')),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("order/", include("apps.order.urls")), # Auth routes - login / register
    # path("", include("apps.authentication.urls")), # Auth routes - login / register
    # path("", include("apps.home.urls"))  
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    
admin.site.site_header = _("KALIP MRP YÖNEMİTİ")
admin.site.site_title = _("KALIP MRP Admin Portal")
admin.site.index_title = _("Yönetici Portalı")