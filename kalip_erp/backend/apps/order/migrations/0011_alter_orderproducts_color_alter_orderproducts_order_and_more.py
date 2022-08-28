# Generated by Django 4.0.3 on 2022-05-19 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0008_alter_colorwarehouse_amount_and_more'),
        ('product', '0024_delete_imagetype'),
        ('order', '0010_orderproducts_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderproducts',
            name='color',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='warehouse.colorwarehouse', verbose_name='Color'),
        ),
        migrations.AlterField(
            model_name='orderproducts',
            name='order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='order.order', verbose_name='Order'),
        ),
        migrations.AlterField(
            model_name='orderproducts',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='product.product', verbose_name='Product'),
        ),
    ]
