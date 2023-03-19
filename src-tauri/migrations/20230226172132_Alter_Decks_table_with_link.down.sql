-- Add down migration script here

CREATE TABLE decktmp (
       decks_id INTEGER PRIMARY KEY,
       title TEXT NOT NULL
);

INSERT INTO decktmp (decks_id, title)
SELECT decks_id, title FROM decks;

DROP TABLE decks;

ALTER TABLE decktmp RENAME TO decks;
