BEGIN;

Create table ms_auth(
  token        text not null,
  updated_at   bigint not null,
  expires_at   bigint not null
);
 
ALTER TABLE ms_auth OWNER TO hitsquad;
