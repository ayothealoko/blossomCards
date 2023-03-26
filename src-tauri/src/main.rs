#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tokio::sync::Mutex;

use blossom_cards::db::Db;
use blossom_cards::model::decks::{create_deck, delete_deck, show_deck, update_deck, Deck};
use lazy_static::lazy_static;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn create_deck_cmd(deck: String) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    let deck_struct = Deck {
        decks_id: None,
        title: deck.clone(),
        link: Some(deck),
    };
    create_deck(&conn, deck_struct).await
}

#[tauri::command]
async fn update_deck_cmd(edit: Deck) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    update_deck(&conn, edit).await
}

#[tauri::command]
async fn delete_deck_cmd(decks_id: i64) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    delete_deck(&conn, decks_id).await
}

#[tauri::command]
async fn show_deck_cmd() -> Vec<Deck> {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    let deck: Vec<Deck> = show_deck(&conn).await;
    deck
}

lazy_static! {
    static ref DB: Mutex<Db> = Mutex::new(Db::new());
}

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    DB.lock().await.connect().await;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            create_deck_cmd,
            delete_deck_cmd,
            show_deck_cmd,
            update_deck_cmd,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
