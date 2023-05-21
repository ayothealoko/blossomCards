-- Add up migration script here
PRAGMA foreign_keys = ON;

CREATE TABLE cards (
       card_id INTEGER PRIMARY KEY,
       front TEXT NOT NULL UNIQUE,
       back TEXT NOT NULL UNIQUE,
       date_created INTEGER NOT NULL,
       date_modified INTEGER NOT NULL,
       decks_id INTEGER NOT NULL, 

       FOREIGN KEY (decks_id)
       REFERENCES decks (decks_id)
       		  ON UPDATE CASCADE
       		  ON DELETE CASCADE
);


CREATE TABLE study_sessions (
       study_session_id INTEGER PRIMARY KEY,
       date_created INTEGER NOT NULL,
       date_modified INTEGER NOT NULL,
       is_completed INTEGER NOT NULL, 

       decks_id INTEGER NOT NULL,
       FOREIGN KEY (decks_id)
       REFERENCES decks (decks_id)
       		  ON UPDATE CASCADE
       		  ON DELETE CASCADE
);


CREATE TABLE session_card_indeces (
       session_card_index_id INTEGER PRIMARY KEY,
       date_created INTEGER NOT NULL,
       date_modified INTEGER NOT NULL,
       study_session_id INTEGER NOT NULL, 
       card_id INTEGER NOT NULL,

       FOREIGN KEY (study_session_id)
       REFERENCES study_sessions (study_session_id)
       		  ON UPDATE CASCADE
       		  ON DELETE CASCADE

       FOREIGN KEY (card_id)
       REFERENCES cards (card_id)
       		  ON UPDATE CASCADE
       		  ON DELETE CASCADE
);
