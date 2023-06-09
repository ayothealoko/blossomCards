-- Add up migration script here
CREATE TABLE decktmp (
       decks_id INTEGER PRIMARY KEY,
       title TEXT NOT NULL UNIQUE,
       link TEXT NOT NULL UNIQUE,
       date_created INTEGER NOT NULL,
       date_modified INTEGER NOT NULL
);

INSERT INTO decktmp (decks_id, title, link,date_created,date_modified)
SELECT decks_id, title, link, date_created, date_modified FROM decks;

DROP TABLE decks;

ALTER TABLE decktmp RENAME TO decks;
