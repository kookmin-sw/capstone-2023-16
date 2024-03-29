# Generated by Django 4.1.5 on 2023-04-12 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0039_challenge_challengeobjective_challengehistory_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challengeobjective',
            name='duration_type',
            field=models.CharField(choices=[('MO', 'Monthly'), ('WK', 'Weekly'), ('DA', 'Daily')], max_length=10, verbose_name='기간 타입'),
        ),
        migrations.AlterField(
            model_name='challengeobjective',
            name='kind',
            field=models.CharField(choices=[('IN', 'Individual'), ('TO', 'Together')], max_length=10, verbose_name='종류'),
        ),
    ]
