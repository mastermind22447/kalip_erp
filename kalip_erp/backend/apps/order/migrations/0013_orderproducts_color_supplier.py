# Generated by Django 4.0.3 on 2022-06-26 17:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0018_imagetype_image_order_id_image_image_type'),
        ('order', '0012_remove_ordercommaterial_material_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderproducts',
            name='color_supplier',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='data.supplier', verbose_name='Supplier'),
        ),
    ]
