
from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse

@login_required(login_url="/login/")
def newOrder(request):
    context = {'segment': 'index'}

    html_template = loader.get_template('order/new.html')
    return HttpResponse(html_template.render(context, request))
