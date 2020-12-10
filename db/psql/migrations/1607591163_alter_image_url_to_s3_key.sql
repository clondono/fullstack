BEGIN;
  ALTER TABLE moderation_images RENAME COLUMN image_url TO s3_key;
COMMIT;