# Generated by Django 4.1.5 on 2023-02-03 20:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("auth_app", "0001_initial"),
        ("persona_app", "0002_alter_persona_age_group_alter_persona_gender"),
    ]

    operations = [
        migrations.AlterField(
            model_name="persona",
            name="user",
            field=models.ForeignKey(
                db_column="user_id",
                on_delete=django.db.models.deletion.CASCADE,
                to="auth_app.user",
                verbose_name="대상 사용자",
            ),
        ),
    ]
