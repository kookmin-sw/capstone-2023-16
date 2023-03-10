# Generated by Django 4.1.5 on 2023-03-08 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0010_remove_persona_user_remove_post_user_persona_owner_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='persona',
            name='gender',
            field=models.CharField(blank=True, default=None, max_length=2, null=True, verbose_name='성별'),
        ),
        migrations.AlterField(
            model_name='persona',
            name='is_public',
            field=models.BooleanField(blank=True, default=True, verbose_name='공개 여부'),
        ),
    ]
