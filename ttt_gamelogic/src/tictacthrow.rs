use wasm_bindgen::prelude::*;


/// A struct representing the standard Tic Tac Throw ruleset
#[wasm_bindgen]
pub struct TicTacThrow {
    /// The pieces on the board
    board: [[i8; 9]; 9],
    /// Stores the owner of each grid
    owned: [i8; 9],
    /// Stores whether each grid is full
    full: Vec<bool>,
    /// Stores whether or not the game is "free"
    free: bool,
    /// Stores the number of un-owned grids
    contested: u8,
    /// Stores the current playable grid
    grid: u8,
    /// Stores whose turn it is (1 for p1, -1 for p2)
    player: i8,
    /// Stores how many turns have passed
    turn: usize,
    /// Stores the past moves that have been made
    past_state: [(bool, u8, u8); 91],
}
