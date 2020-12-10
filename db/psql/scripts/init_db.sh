#!/bin/bash

if [ $1 == 'localhost' ]; then

  POSTGRES_HOST="localhost"
  POSTGRES_PORT="5432"
  POSTGRES_USER='postgres'
  POSTGRES_PASSWORD=''
  POSTGRES_DATABASE='honeypot_db'

elif [ $1 == 'production' ]; then
  POSTGRES_HOST="honeypot-pg.o7.castle.fm"
  POSTGRES_PORT="6432"
  POSTGRES_USER='honeypot'
  POSTGRES_PASSWORD=$2
  POSTGRES_DATABASE='honeypot_db'
else

  echo "$1 is not an allowed config -- please use localhost or staging or compose"
  exit 1

fi

  echo "Using" $1

INIT_DATABASE='../migrations/init/init-db.sql'
INIT_SCHEMA='../migrations/init/schema.sql'
INIT_DATA='../migrations/init/seed_data.sql'

echo "Rebuilding $POSTGRES_HOST database"
echo PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST -p $POSTGRES_PORT < $INIT_DATABASE
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST -p $POSTGRES_PORT < $INIT_DATABASE

echo "Creating schema"
echo PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST -p $POSTGRES_PORT $POSTGRES_DATABASE < $INIT_SCHEMA
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST -p $POSTGRES_PORT $POSTGRES_DATABASE < $INIT_SCHEMA

echo "Dumping data"
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST -p $POSTGRES_PORT $POSTGRES_DATABASE < $INIT_DATA
