# Generated by Django 4.0.2 on 2022-03-06 18:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0007_middleproduct'),
    ]

    operations = [
        migrations.DeleteModel(
            name='MiddleProduct',
        ),
        migrations.AddField(
            model_name='product',
            name='is_last_product',
            field=models.BooleanField(default=False, verbose_name='Is last product?'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='product.product', verbose_name='Parent product'),
        ),
    ]
