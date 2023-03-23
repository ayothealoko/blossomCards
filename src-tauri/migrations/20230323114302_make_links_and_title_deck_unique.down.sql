-- Add down migration script here
CREATE TABLE decktmp (
       decks_id INTEGER PRIMARY KEY,
       title TEXT NOT NULL,
       link TEXT NOT NULL,
       date_created INTEGER,
       date_modified INTEGER,
);

INSERT INTO decktmp (decks_id, title, link,date_created,date_modified)
SELECT decks_id, title, link, date_created, date_modified FROM decks;

DROP TABLE decks;

ALTER TABLE decktmp RENAME TO decks;
