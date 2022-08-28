# Generated by Django 4.0.2 on 2022-03-08 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0013_alter_producttype_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='producttype',
            options={'verbose_name': 'Product type', 'verbose_name_plural': 'Product types'},
        ),
        migrations.AddField(
            model_name='product',
            name='material_amount',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
