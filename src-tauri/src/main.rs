#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use blossom_cards::model::cards::{create_card, delete_card, read_cards, update_card, Card};
use tokio::sync::Mutex;

use blossom_cards::db::Db;
use blossom_cards::model::decks::{
    create_deck, delete_deck, get_decks_id, show_deck, update_deck, Deck,
};
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

#[tauri::command]
async fn get_decks_id_cmd(deck_name: String) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    let decks_id: i64 = get_decks_id(&conn, deck_name).await;
    decks_id
}

#[tauri::command]
async fn create_card_cmd(front: String, back: String, decks_id: i64) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    create_card(&conn, front, back, decks_id).await
}

#[tauri::command]
async fn read_cards_cmd(decks_id: i64) -> Vec<Card> {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    let card: Vec<Card> = read_cards(&conn, decks_id).await;
    card
}

#[tauri::command]
async fn update_card_cmd(card_id: i64, back: String, front: String) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    update_card(&conn, card_id, back, front).await
}

#[tauri::command]
async fn delete_card_cmd(card_id: i64) -> i64 {
    let conn_op = &DB.lock().await.conn;
    let conn = match conn_op {
        Some(v) => v,
        None => panic!(),
    };

    delete_card(&conn, card_id).await
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
            create_card_cmd,
            read_cards_cmd,
            update_card_cmd,
            delete_card_cmd,
            get_decks_id_cmd
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
