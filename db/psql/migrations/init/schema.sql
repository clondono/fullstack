BEGIN;

Create table users(
email         text UNIQUE  not   null,
password_hash text not     null,
user_id       text PRIMARY KEY,
first_name    text ,
company       text ,
last_name     text,
created_at    bigint
);
 
ALTER TABLE users OWNER TO hitsquad;

CREATE TABLE IF NOT EXISTS completed_migrations(
  file_name        text      not null
);

ALTER TABLE completed_migrations OWNER TO hitsquad;

COMMIT;