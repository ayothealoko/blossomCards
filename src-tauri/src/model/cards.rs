use serde::{Deserialize, Serialize};
use sqlx::sqlite::SqlitePool;

#[derive(Debug, Serialize, Deserialize)]
pub struct Card {
    pub card_id: i64,
    pub decks_id: i64,
    pub front: String,
    pub back: String,
}

// returns -1 if create_cards fails
pub async fn create_card(pool: &SqlitePool, front: String, back: String, decks_id: i64) -> i64 {
    let mut conn = pool.acquire().await.unwrap();

    let id = sqlx::query!(
        r#"
INSERT INTO cards ( front,back, date_created, date_modified, decks_id )
VALUES ( ?1, ?2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?3 );
        "#,
        front,
        back,
        decks_id
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}

pub async fn read_cards(pool: &SqlitePool, decks_id: i64) -> Vec<Card> {
    let recs = sqlx::query!(
        r#"

SELECT card_id, decks_id, front, back, date_created
FROM cards
WHERE decks_id = ?1
ORDER BY date_created ASC;
        "#,
        decks_id
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut cards = Vec::new();

    for row in recs {
        cards.push(Card {
            card_id: row.card_id.unwrap(),
            decks_id: row.decks_id,
            front: row.front,
            back: row.back,
        });
    }

    cards
}

// returns -1 if create_deck fails
pub async fn update_card(pool: &SqlitePool, card_id: i64, front: String, back: String) -> i64 {
    let mut conn = pool.acquire().await.unwrap();

    let id = sqlx::query!(
        r#"
UPDATE  cards
SET
 front = $1,
 back = $2,
 date_modified = CURRENT_TIMESTAMP
WHERE card_id = $3;
        "#,
        front,
        back,
        card_id
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}

pub async fn delete_card(pool: &SqlitePool, card_id: i64) -> i64 {
    let mut conn = pool.acquire().await.unwrap();
    let id = sqlx::query!(
        r#"
DELETE FROM  cards
WHERE card_id = $1;
        "#,
        card_id
    )
    .execute(&mut conn)
    .await;

    match id {
        Ok(v) => v.last_insert_rowid(),
        Err(_) => -1,
    }
}
