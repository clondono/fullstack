#!/bin/bash

if [ $1 == 'localhost' ]; then

  POSTGRES_HOST="localhost"
  POSTGRES_PORT="5432"
  POSTGRES_USER='postgres'
  POSTGRES_PASSWORD=''
  POSTGRES_DATABASE='sample_db'

elif [ $1 == 'production' ]; then

  POSTGRES_HOST=""
  POSTGRES_PORT=""
  POSTGRES_USER='sample_db'
  POSTGRES_PASSWORD='password'
  POSTGRES_DATABASE='sample_db'
else

  echo "$1 is not an allowed config -- please use localhost or staging or testing"
  exit 1

fi
  echo "using" $1

# postgres migrations
DIR='../migrations'
sql='select * from completed_migrations'  
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST  -p $POSTGRES_PORT $POSTGRES_DATABASE <<< "$sql">>temp
errorlog=$(mktemp)


for filename in $(ls $DIR | grep sql  | sort -t- -k1 -k2 -k3); do
 
if grep -q "$filename" temp
then 
echo "already ran" $filename
else 
   printf "\n"
  echo "Running migration: "./$DIR/$filename
  PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST  -p $POSTGRES_PORT $POSTGRES_DATABASE < ./$DIR/$filename 2> $errorlog
  if  grep -q "ERROR" $errorlog  && [ "$2" != "skip" ];
  then
  cat $errorlog
  else
  insert="insert into completed_migrations(file_name) values('$filename')" 
  PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -h $POSTGRES_HOST  -p $POSTGRES_PORT $POSTGRES_DATABASE <<< $insert  
  fi
  
fi
done
rm temp
