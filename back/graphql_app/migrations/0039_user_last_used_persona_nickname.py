# Generated by Django 4.1.5 on 2023-04-11 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0038_alter_postreadingrecord_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='last_used_persona_nickname',
            field=models.CharField(blank=True, default=None, max_length=20, null=True, verbose_name='마지막으로 사용한 페르소나의 닉네임'),
        ),
    ]
