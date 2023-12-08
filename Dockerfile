
FROM nikolaik/python-nodejs:python3.11-nodejs20-slim AS base

ENV PYTHONUNBUFFERED=1

WORKDIR /app

ADD . /app

COPY ./requirements.txt /app/requirements.txt

RUN apt-get update && \
    apt-get install -y python3-dev default-libmysqlclient-dev && \
    apt-get install -y build-essential && \
    apt-get clean

RUN pip install -r requirements.txt

COPY . /app

RUN python3 manage.py makemigrations
RUN python3 manage.py migrate

RUN python3 manage.py loaddata category_data.json
RUN python3 manage.py loaddata faculty_data.json
RUN python3 manage.py loaddata degree_data.json
RUN python3 manage.py loaddata default_user_data.json
RUN python3 manage.py loaddata default_ads.json


