# Generated by Django 4.1.5 on 2023-03-01 00:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("graphql_app", "0003_rename_age_group_persona_age"),
    ]

    operations = [
        migrations.AlterField(
            model_name="persona",
            name="age",
            field=models.PositiveIntegerField(
                blank=True, default=None, null=True, verbose_name="나이"
            ),
        ),
        migrations.AlterField(
            model_name="persona",
            name="gender",
            field=models.CharField(
                default=None, max_length=2, null=True, verbose_name="성별"
            ),
        ),
    ]
