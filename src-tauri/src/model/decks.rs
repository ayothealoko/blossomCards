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
INSERT INTO decks ( title, link )
VALUES ( ?1, ?2 );
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

SELECT decks_id, title, link
FROM decks;
        "#
    )
    .fetch_all(pool)
    .await
    .unwrap();

    let mut decks = Vec::new();

    for row in recs {
        decks.push(Deck {
            decks_id: Some(row.decks_id),
            title: row.title,
            link: row.link,
        });
    }

    decks
}
