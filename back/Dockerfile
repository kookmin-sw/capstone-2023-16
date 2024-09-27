# syntax=docker/dockerfile:1
FROM python:3.11
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN pip install "poetry==1.3.2"

WORKDIR /app
COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false \
  && poetry install --no-interaction --no-ansi
COPY . /app/

RUN apt-get update && apt-get install -y cron

# Copy cron file to the cron.d directory on container
COPY cron /etc/cron.d/cron
# Give execution access
RUN chmod 0755 /etc/cron.d/cron
# Run cron job on cron file
RUN crontab /etc/cron.d/cron
# Create the log file
RUN touch /var/log/cron.log
RUN cron

CMD python manage.py migrate && gunicorn --bind 0.0.0.0:$PORT config.wsgi