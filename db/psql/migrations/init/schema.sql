BEGIN;

Create table users(
email         text UNIQUE  not   null,
password_hash text not     null,
user_id       text PRIMARY KEY,
first_name    text ,
company       text ,
last_name     text,
created_at    timestamp DEFAULT (NOW() at time zone 'utc'),
updated_at    timestamp DEFAULT (NOW() at time zone 'utc')
);
ALTER TABLE users OWNER TO clondono;
 

CREATE TABLE IF NOT EXISTS user_invites(
  email           text      PRIMARY KEY,
  token           text      not null,
  invited_at      timestamp without time zone not null default (NOW() at time zone 'utc'),
  used            boolean NOT NULL default false
);
ALTER TABLE user_invites OWNER TO clondono;

CREATE TABLE user_pw_resets (
  user_id TEXT,
  email TEXT,
  token TEXT,
  requested_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc'), 
  used boolean not null DEFAULT false,
  PRIMARY KEY(user_id, used)
);

ALTER TABLE user_pw_resets OWNER TO clondono;

CREATE TABLE IF NOT EXISTS completed_migrations(
  file_name        text      not null
);

ALTER TABLE completed_migrations OWNER TO clondono;

COMMIT;