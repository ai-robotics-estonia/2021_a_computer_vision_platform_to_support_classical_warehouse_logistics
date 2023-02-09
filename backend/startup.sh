#!/usr/bin/env sh

alembic upgrade head

echo "$APP_ENV"

chmod +x startup.sh

if [ "$APP_ENV" = "development" ]
then
  echo "Staring a development server"
#  rm -rf /opt/pysetup/.venv1/*
#  cp -r /opt/pysetup/.venv/* /opt/pysetup/.venv1/
  uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
elif [ "$APP_ENV" = "worker" ]
then
  echo "Starting a celery worker"
  cp /etc/laosysteem/known_hosts ~/.ssh/known_hosts
  celery -A app.tasks worker -P threads
elif [ "$APP_ENV" = "scheduler" ]
then
  echo "Starting a celery scheduler"
  cp /etc/laosysteem/known_hosts ~/.ssh/known_hosts
  celery -A app.tasks beat
else
  cp /etc/laosysteem/known_hosts ~/.ssh/known_hosts
  uvicorn app.main:app --host 0.0.0.0 --port 8000
fi
