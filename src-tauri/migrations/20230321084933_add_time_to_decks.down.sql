-- Add down migration script here

CREATE TABLE decktmp (
       decks_id INTEGER PRIMARY KEY,
       title TEXT NOT NULL,
       link TEXT UNIQUE
);

INSERT INTO decktmp (decks_id, title, link)
SELECT decks_id, title, link FROM decks;

DROP TABLE decks;

ALTER TABLE decktmp RENAME TO decks;
DELETE FROM decks
WHERE title = "Default Deck";
