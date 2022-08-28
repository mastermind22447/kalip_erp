from rest_framework.serializers import ModelSerializer
from .models import Material
from drf_queryfields import QueryFieldsMixin


class MaterialSerializer(QueryFieldsMixin, ModelSerializer):
    class Meta:
        model = Material
        exclude = ()
        