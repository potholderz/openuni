# Generated by Django 2.0.3 on 2018-03-24 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stream', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='featured',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='stream',
            name='featured',
            field=models.BooleanField(default=False),
        ),
    ]
