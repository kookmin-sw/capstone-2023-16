# Generated by Django 4.1.5 on 2023-03-01 18:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("graphql_app", "0005_merge_20230301_1539"),
    ]

    operations = [
        migrations.AlterField(
            model_name="persona",
            name="age",
            field=models.PositiveIntegerField(
                blank=True, default=None, null=True, verbose_name="연령대"
            ),
        ),
    ]
