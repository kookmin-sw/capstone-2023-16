# Generated by Django 4.1.5 on 2023-03-18 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('graphql_app', '0029_alter_post_paid_content'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='waitfreepersona',
            unique_together={('persona', 'post')},
        ),
        migrations.AlterModelTable(
            name='waitfreepersona',
            table='wait_free_persona',
        ),
    ]
