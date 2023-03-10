# Generated by Django 4.1.5 on 2023-03-10 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0012_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='preferred_categories',
            field=models.ManyToManyField(related_name='preferred_users_as_category', to='graphql_app.category', verbose_name='선호 카테고리 목록'),
        ),
        migrations.AlterField(
            model_name='persona',
            name='preferred_tags',
            field=models.ManyToManyField(related_name='preferred_users_as_tag', to='graphql_app.tag', verbose_name='선호 태그 목록'),
        ),
    ]
