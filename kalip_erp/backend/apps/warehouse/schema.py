from multiprocessing.spawn import import_main_path
from django.db.models import Sum
import graphene

from .models import *
from apps.data.models import Material, ComMaterial, Color
from .defs import *

class Query(graphene.ObjectType):
    materialWarehouses = graphene.List(MaterialWarehouseType)
    comMaterialWarehouses = graphene.List(ComMaterialWarehouseType)
    colorWarehouses = graphene.List(ColorWarehouseType)
    # colorWarehouse = graphene.Field(ColorWarehouseType, id=graphene.Int(required=True))



    def resolve_materialWarehouses(root, info, **kwargs):
        result = MaterialWarehouse.objects.raw("""select wcm.id, sum(IFNULL(wcm.amount, 0)) as amount, cm.id as material_id, wcm.supplier_id 
                                                        from data_material as cm
                                                        left join warehouse_materialwarehouse as wcm on cm.id = wcm.material_id
                                                        group by wcm.material_id, wcm.supplier_id;""")
        i = 1
        for ws in result:
            supplier_id = ws.supplier_id if ws.supplier_id is not None else 0
            ws.id = f"{ws.material_id}-{supplier_id}"
            i += 1
            
        return result
 
    def resolve_comMaterialWarehouses(root, info, **kwargs):
        # result = ComMaterial.objects.all()
        result = ComMaterialWarehouse.objects.raw("""select wcm.id, sum(IFNULL(wcm.amount, 0)) as amount, cm.id as com_material_id, wcm.supplier_id 
                                                        from data_commaterial as cm
                                                        left join warehouse_commaterialwarehouse as wcm on cm.id = wcm.com_material_id
                                                        group by wcm.com_material_id, wcm.supplier_id;""")
        i = 1
        for ws in result:
            supplier_id = ws.supplier_id if ws.supplier_id is not None else 0
            ws.id = f"{ws.com_material_id}-{supplier_id}"
            i += 1
            
        return result    

    def resolve_colorWarehouses(root, info, **kwargs):
        result = ColorWarehouse.objects.raw("""select wcm.id, sum(IFNULL(wcm.amount, 0)) as amount, cm.id as color_id, wcm.supplier_id 
                                                        from data_color as cm
                                                        left join warehouse_colorwarehouse as wcm on cm.id = wcm.color_id
                                                        group by wcm.color_id, wcm.supplier_id;""")
        i = 1
        for ws in result:
            supplier_id = ws.supplier_id if ws.supplier_id is not None else 0
            ws.id = f"{ws.color_id}-{supplier_id}"
            i += 1
            
        return result



    # def resolve_colorWarehouse(root, info, id):
    #     try:
    #         return ColorWarehouse.objects.get(id=id)
    #     except ColorWarehouse.DoesNotExist:
    #         return None


schema = graphene.Schema(query=Query)