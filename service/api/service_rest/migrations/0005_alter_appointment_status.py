# Generated by Django 4.0.3 on 2024-02-06 19:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0004_alter_appointment_date_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
