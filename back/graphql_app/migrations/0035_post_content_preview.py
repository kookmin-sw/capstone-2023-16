# Generated by Django 4.1.5 on 2023-03-24 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0034_remove_persona_required_membership_tier_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='content_preview',
            field=models.TextField(blank=True, default=True, null=True, verbose_name='글 내용 미리보기'),
        ),
    ]
