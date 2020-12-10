#!/bin/bash

if [ $1 == 'localhost' ]; then

  POSTGRES_HOST="localhost"
  POSTGRES_PORT="5432"
  POSTGRES_USER='postgres'
  POSTGRES_PASSWORD=''
  POSTGRES_DATABASE='postgres'
else
  echo "$1 is not an allowed config -- please use localhost or staging or testing"
  exit 1

fi

echo "Using" $1

DROP_DATABASE='./drop_db.sql'

echo "Dropping $POSTGRES_HOST database"
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST  -p $POSTGRES_PORT < $DROP_DATABASE