use wasm_bindgen::prelude::*;


/// A struct representing the standard Tic Tac Throw ruleset
#[wasm_bindgen]
pub struct TicTacThrow {
    /// The pieces on the board
    board: [[i8; 9]; 9],
    /// Stores the owner of each grid
    owned: [i8; 9],
    /// Stores whether each grid is full
    full: [bool; 9],
    /// Stores whether or not the game is "free"
    free: bool,
    /// Stores the number of un-owned grids
    contested: usize,
    /// Stores the current playable grid
    grid: usize,
    /// Stores whose turn it is (1 for p1, -1 for p2)
    player: isize,
    /// Stores how many turns have passed
    turn: usize,
    /// Stores the past moves that have been made
    past_state: [(bool, u8, u8); 81],
}

#[wasm_bindgen]
impl TicTacThrow {
    /// Converts the board to JSON format to send over the network
    pub fn jsonify(&self) -> String {
        let mut json = "{\n  \"board\" : [\n".to_string();
        // Handle grids 0-7 in the board
        for grid in 0..8 {
            json.push_str(format!("    [{}", self.board[grid][0]).as_str());
            for pos in 1..9 {
                json.push_str(
                    format!(", {}", self.board[grid][pos]).as_str()
                );
            }
            json.push_str("],\n");
        }
        // Handle grid 8
        json.push_str(format!("    [{}", self.board[8][0]).as_str());
        for pos in 1..9 {
            json.push_str(
                format!(", {}", self.board[8][pos]).as_str()
            );
        }
        // Handle owned and full
        let mut full_str = format!("\"full\" : [{}", self.full[0]).to_string();
        json.push_str(
            format!("]\n  ],\n  \"owned\" : [{}", self.owned[0]).as_str()
        );
        for grid in 1..9 {
            json.push_str(format!(", {}", self.owned[grid]).as_str());
            full_str.push_str(format!(", {}", self.full[grid]).as_str());
        }
        json.push_str(format!("],\n  {}],", full_str).as_str());
        json.push_str(format!("
  \"free\" : {},
  \"contested\" : {},
  \"grid\" : {},
  \"player\" : {},
  \"turn\" : {},
", self.free, self.contested, self.grid, self.player, self.turn).as_str());
        if self.turn == 0 {
            json.push_str("  \"past_state\" : []\n}");
        } else {
            json.push_str("  \"past_state\" : [\n");
            for i in 0..(self.turn-1) {
                json.push_str(format!(
                    "    [{}, {}, {}],\n",
                    self.past_state[i].0, self.past_state[i].1, self.past_state[i].2
                ).as_str());
            }
            let i = self.turn - 1;
            json.push_str(format!(
                "    [{}, {}, {}]\n  ]\n",
                self.past_state[i].0, self.past_state[i].1, self.past_state[i].2
            ).as_str());
            json.push('}');
        }
        return json;
    }

    /// Generates an empty board object
    pub fn new() -> TicTacThrow {
        TicTacThrow {
            board: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            owned: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            full: [false, false, false, false, false, false, false, false, false],
            free: true,
            contested: 9,
            grid: 4,
            player: -1,
            turn: 0,
            past_state: [(false, 0, 0); 81]
        }
    }

    /// Determines whether a given move is valid or not
    pub fn is_valid_move(&self, grid: usize, pos: usize) -> bool {
        // Checks whether or not a piece already occupies that position
        if self.board[grid][pos] != 0 {
            return false;
        } else if !(self.free || self.grid == grid) {
            return false;
        }
        // Turn 0 is a special case, and is treated as such
        if self.turn == 0 {
            return (grid != pos) && (pos != 4);
        // If free, any move is good
        } else if self.free {
            return true;
        }
        // Gets the number of open squares in the current grid
        let num_open: i8 = self.board[grid].iter()
            .map(|x| if *x >= 0 {*x} else {-x})
            .sum();
        let last_grid = self.past_state[self.turn - 1].1 as usize;
        return num_open == 8 || (last_grid != pos);
    }
}
