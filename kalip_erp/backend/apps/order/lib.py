from apps.order.models import Order, OrderProducts, OrderComMaterial
from apps.warehouse.models import ColorWarehouse
from default import utils
from datetime import datetime
from pprint import pprint

def insert_order(order_data):
    new_order = Order()
    new_order.code = datetime.now().strftime("%m%d%H%M")
    pprint(order_data)
    new_order.product_id = int(order_data['product']['id'])
    new_order.company_id = int(order_data['company'])
    new_order.order_amount = order_data['order_count']
    new_order.box_size = order_data['box_size']
    new_order.inner_box_size = order_data['inner_box_size']
    new_order.special_box = order_data['special_box']
    new_order.box_pieces = order_data['inner_box_amount']
    new_order.has_bag = order_data['has_box_bag']
    new_order.bag_id = int(order_data['box_bag'].split("-")[0])
    new_order.seperator = order_data['seperator']
    new_order.order_at = utils.convert_date(order_data['order_date'])
    new_order.finished_at = utils.convert_date(order_data['delivery_date'])
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("User"), blank=True, null=True)
    new_order.barkod = order_data['barcode']
    new_order.eticket = order_data['top_label']
    new_order.delivery_address = order_data['delivery_address']
    new_order.delivery_mode = order_data['delivery_type']
    new_order.conditions = order_data['delivery_conds']
    new_order.save()
    # return 3216345
    return new_order.id




def insert_order_products(order_id , order_data):
   
    if len(order_data['product']['productSet']) :
        for p in order_data['product']['productSet']:
            new_order_product = OrderProducts()
            new_order_product.order_id = int(order_id)
            new_order_product.product_id = int(p['id'])
            new_order_product.color_id = int(str(order_data['selectedColors'][p['id']]).split("-")[0])
            new_order_product.color_supplier_id = int(str(order_data['selectedColors'][p['id']]).split("-")[1])
            new_order_product.color_percent = order_data['colorPercents'][p['id']]
            new_order_product.has_silk = order_data['hasSerigrafies'][p['id']]

            new_order_product.save()
    else:
        new_order_product = OrderProducts()
        new_order_product.order_id = int(order_id)
        new_order_product.product_id = int(order_data['product']['id'])
        new_order_product.color_id = int(str(order_data['selectedColors'][order_data['product']['id']]).split("-")[0])
        new_order_product.color_supplier_id = int(str(order_data['selectedColors'][order_data['product']['id']]).split("-")[1])
        new_order_product.color_percent = order_data['colorPercents'][order_data['product']['id']]
        new_order_product.has_silk = order_data['hasSerigrafies'][order_data['product']['id']]

        new_order_product.save()

def insert_order_commaterial(order_id, order_data):
    # com_materials = order_data['hasComMaterials']
    # for c in com_materials:
    #     if com_materials[c]:
    for cm in order_data['product']['productcommaterialSet']:
        order_com_material = OrderComMaterial()
        order_com_material.order_id = int(order_id)
        order_com_material.com_material_id = int(cm['comMaterial']['id'])

        # print("------------------")
        # pprint(order_com_material.__dict__)
        # print("------------------")
        order_com_material.save()
