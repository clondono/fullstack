
Create table users(
email         text UNIQUE  not   null,
password_hash text not     null,
user_id       text PRIMARY KEY,
first_name    text not     null,
company       text not     null,
last_name     text not     null,
);
 
ALTER TABLE users OWNER TO sample_user;

CREATE TABLE IF NOT EXISTS completed_migrations(
  file_name        text      not null
);

ALTER TABLE completed_migrations OWNER TO sample_user;