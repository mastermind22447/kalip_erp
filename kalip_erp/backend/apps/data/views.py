from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from .models import Material
from .serializers import MaterialSerializer
# from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote
from .utils import getMaterialList


# /notes GET
# /notes POST
# /notes/<id> GET
# /notes/<id> PUT
# /notes/<id> DELETE

@api_view(['GET', 'POST'])
def getMaterials(request):

    if request.method == 'GET':
        return getMaterialList(request)

#     if request.method == 'POST':
#         return createNote(request)


# @api_view(['GET', 'PUT', 'DELETE'])
# def getNote(request, pk):

#     if request.method == 'GET':
#         return getNoteDetail(request, pk)

#     if request.method == 'PUT':
#         return updateNote(request, pk)

#     if request.method == 'DELETE':
#         return deleteNote(request, pk)