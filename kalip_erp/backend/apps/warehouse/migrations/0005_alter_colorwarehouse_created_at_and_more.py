# Generated by Django 4.0.2 on 2022-03-08 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0004_alter_colorwarehouse_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='colorwarehouse',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Created at'),
        ),
        migrations.AlterField(
            model_name='colorwarehouse',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Updated at'),
        ),
    ]
