# Generated by Django 4.0.2 on 2022-03-03 14:52

import apps.warehouse.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('data', '0012_remove_region_city_delete_city_delete_region'),
        ('warehouse', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MaterialWarehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(default=0, verbose_name='Amount')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('material', models.ForeignKey(on_delete=apps.warehouse.models.set_null, to='data.material', verbose_name='Material')),
                ('supplier', models.ForeignKey(on_delete=apps.warehouse.models.set_null, to='data.supplier', verbose_name='Supplier')),
                ('user', models.ForeignKey(on_delete=apps.warehouse.models.set_null, to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=200, verbose_name='Warehouse name')),
                ('code', models.CharField(blank=True, max_length=200, null=True, verbose_name='Warehouse code')),
                ('location', models.CharField(blank=True, max_length=200, null=True, verbose_name='Location')),
            ],
            options={
                'verbose_name': 'Warehouse',
                'verbose_name_plural': 'Warehouses',
            },
        ),
        migrations.DeleteModel(
            name='Stock',
        ),
        migrations.AddField(
            model_name='materialwarehouse',
            name='warehouse',
            field=models.ForeignKey(on_delete=apps.warehouse.models.set_null, to='warehouse.warehouse', verbose_name='Stock'),
        ),
    ]
