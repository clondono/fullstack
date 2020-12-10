BEGIN;

Create table hsl_code(
  hsl_code     text not null,
  thresholds   jsonb not null
);
 
ALTER TABLE hsl_code OWNER TO hitsquad;

COMMIT;
