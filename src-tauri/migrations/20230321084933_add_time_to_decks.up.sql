-- Add up migration script here
ALTER TABLE decks
ADD COLUMN date_created INTEGER;

ALTER TABLE decks
ADD COLUMN date_modified INTEGER;

-- Cant set default time so update 
UPDATE decks SET date_created = CURRENT_TIMESTAMP;
UPDATE decks SET date_modified = CURRENT_TIMESTAMP;

-- Add default deck so deck in not empyt
INSERT INTO decks (title, link, date_created, date_modified)
VALUES ("Default Deck", "Default Deck", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
