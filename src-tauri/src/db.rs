use dotenvy;
use sqlx::{sqlite::SqlitePool, Pool, Sqlite};
pub struct Db {
    pub conn: Option<Pool<Sqlite>>,
}

impl Db {
    pub fn new() -> Self {
        Db { conn: None }
    }

    pub async fn connect(&mut self) {
        let database_url = dotenvy::var("DATABASE_URL").unwrap();
        let conn = SqlitePool::connect(&database_url).await.unwrap();
        self.conn = Some(conn);
    }
}
