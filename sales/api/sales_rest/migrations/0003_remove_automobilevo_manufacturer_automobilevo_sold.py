# Generated by Django 4.0.3 on 2024-02-07 19:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_automobilevo_import_href'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='manufacturer',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]
