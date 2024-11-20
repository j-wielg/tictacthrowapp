mod utils;
mod tictacthrow;
pub use tictacthrow::TicTacThrow;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, ttt_gamelogic!");
}
