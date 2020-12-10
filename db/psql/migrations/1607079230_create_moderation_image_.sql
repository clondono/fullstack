BEGIN;

CREATE TYPE label_values AS ENUM ('NSFW', 'NOT_NSFW', 'INCONCLUSIVE');

Create table moderation_images(
  image_id     text PRIMARY KEY,
  image_url    text not null,
  metadata     jsonb not null default '{}'::jsonb,
  label_result label_values,
  created_at   bigint,
  updated_at   bigint
);

ALTER TYPE label_values OWNER TO hitsquad;
ALTER TABLE moderation_images OWNER TO hitsquad;

COMMIT;