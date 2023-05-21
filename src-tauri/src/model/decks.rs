use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqlitePool;

#[derive(Debug, Serialize, Deserialize)]
pub struct Deck {
    pub decks_id: Option<i64>,
    pub title: String,
    pub link: Option<String>,
}

// returns -1 if create_deck fails
pub async fn create_deck(pool: &SqlitePool, deck: Deck) -> i64 {
    let mut conn = pool.acquire().await.unwrap();

    let id = sqlx::query!(
        r#"
INSERT INTO decks ( title, link, date_created, date_modified )
VALUES ( ?1, ?2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP );
        "#,
        deck.title,
        deck.link
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}

pub async fn show_deck(pool: &SqlitePool) -> Vec<Deck> {
    let recs = sqlx::query!(
        r#"
SELECT decks_id, title, link, date_created
FROM decks
ORDER BY date_created ASC;
        "#
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut decks = Vec::new();

    for row in recs {
        decks.push(Deck {
            decks_id: row.decks_id,
            title: row.title,
            link: Some(row.link),
        });
    }

    decks
}

// returns -1 if create_deck fails
pub async fn update_deck(pool: &SqlitePool, deck: Deck) -> i64 {
    let mut conn = pool.acquire().await.unwrap();

    let id = sqlx::query!(
        r#"
UPDATE  decks
SET
 title = $1,
 link = $2,
 date_modified = CURRENT_TIMESTAMP
WHERE decks_id = $3;
        "#,
        deck.title,
        deck.link,
        deck.decks_id
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}

pub async fn delete_deck(pool: &SqlitePool, decks_id: i64) -> i64 {
    let mut conn = pool.acquire().await.unwrap();
    let id = sqlx::query!(
        r#"
DELETE FROM  decks
WHERE decks_id = $1;
        "#,
        decks_id
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}

pub async fn get_decks_id(pool: &SqlitePool, deck_name: String) -> i64 {
    let recs = sqlx::query!(
        r#"
SELECT decks_id
FROM decks
WHERE title = ?1
ORDER BY date_created ASC;
        "#,
        deck_name
    )
    .fetch_one(pool)
    .await
    .unwrap();

    let id = recs.decks_id;

    match id {
        Some(v) => v,
        None => -1,
    }
}
