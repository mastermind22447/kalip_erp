# Generated by Django 4.0.3 on 2022-04-05 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0022_imagetype_productimage'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProductImage',
        ),
    ]
