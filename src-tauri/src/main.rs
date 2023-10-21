#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use sqlx::mysql::MySqlPool;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct Info{
  id: i32,
  nom: Option<String>,
  prenom: Option<String>,
  email: Option<String>,
}

fn main() -> Result<(), sqlx::Error>{
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![display_data, insert_data])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");

  Ok(())
}

#[tauri::command]
async fn display_data() -> Result<Vec<Info>, String>{
  let pool = MySqlPool::connect("mysql://root:@localhost:3306/test").await.expect("Connection impossible");
  let infos = sqlx::query_as!(Info,
    "SELECT * FROM infos"
  ).fetch_all(&pool).await.expect("Error in Queries");
  Ok(infos)
}

#[tauri::command]
async fn insert_data(nom: &str, prenom: &str, email: &str) -> Result<String, String> {
  let pool = MySqlPool::connect("mysql://root:@localhost:3306/test").await.expect("Connection impossible");
  sqlx::query("INSERT INTO infos (nom, prenom, email) VALUES (?, ?, ?)")
      .bind(nom)
      .bind(prenom)
      .bind(email)
      .execute(&pool).await.expect("Error insertion impossible");
  Ok("Insert success".into())
}