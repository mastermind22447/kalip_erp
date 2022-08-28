# Generated by Django 4.0.2 on 2022-03-08 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0005_orderstatus_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.IntegerField(choices=[(1, 'New orders'), (2, 'Open orders'), (3, 'Closed orders'), (4, 'Return orders')], default=1, verbose_name='Status'),
        ),
        migrations.DeleteModel(
            name='OrderStatus',
        ),
    ]
