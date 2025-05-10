use wasm_bindgen::prelude::*;


#[wasm_bindgen]
#[derive(Clone)]
/// Represents a single move in a game of tic-tac-throw
pub struct Move {
    pub free : bool,
    pub grid : u8,
    pub pos : u8,
}

impl Move {
    pub fn new(free: bool, grid: u8, pos: u8) -> Move {
        if grid > 8 || pos > 8 {
            panic!("Invalid arguments for new move");
        }
        Move {free, grid, pos}
    }
}

/// A struct representing the standard Tic Tac Throw ruleset
/// Most fields can be directly set and read by JS. The exception is
/// `board`, which requires a getter.
#[wasm_bindgen(getter_with_clone)]
pub struct TicTacThrow {
    /// The pieces on the board
    board: [[i8; 9]; 9],
    /// Stores the owner of each grid
    pub owned: Vec<i8>,
    /// Stores whether each grid is full
    pub full: Vec<u8>,
    /// Stores whether or not the game is "free"
    pub free: bool,
    /// Stores the number of un-owned grids
    pub contested: usize,
    /// Stores the current playable grid
    pub grid: usize,
    /// Stores whose turn it is (1 for p1, -1 for p2)
    pub player: isize,
    /// Stores how many turns have passed
    pub turn: usize,
    /// Stores which player has won
    pub winner: isize,
    /// Determines whether or not the game is still running
    pub active: bool,
    /// Stores the past moves that have been made
    pub past_state: Vec<Move>,
}

#[wasm_bindgen]
impl TicTacThrow {
    /// Converts the board to JSON format
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
        let mut full_str = format!("\"full\" : [{}", self.full[0] != 0).to_string();
        json.push_str(
            format!("]\n  ],\n  \"owned\" : [{}", self.owned[0]).as_str()
        );
        for grid in 1..9 {
            json.push_str(format!(", {}", self.owned[grid]).as_str());
            full_str.push_str(format!(", {}", (self.full[grid] != 0)).as_str());
        }
        json.push_str(format!("],\n  {}],", full_str).as_str());
        json.push_str(format!("
  \"free\" : {},
  \"contested\" : {},
  \"grid\" : {},
  \"player\" : {},
  \"turn\" : {},
  \"winner\" : {},
  \"active\" : {},
", self.free, self.contested, self.grid, self.player, 
self.turn, self.winner, self.active).as_str());
        if self.turn == 0 {
            json.push_str("  \"past_state\" : []\n}");
        } else {
            json.push_str("  \"past_state\" : [\n");
            for i in 0..(self.turn-1) {
                json.push_str(format!(
                    "    [{}, {}, {}],\n",
                    self.past_state[i].free, self.past_state[i].grid, self.past_state[i].pos
                ).as_str());
            }
            let i = self.turn - 1;
            json.push_str(format!(
                "    [{}, {}, {}]\n  ]\n",
                self.past_state[i].free, self.past_state[i].grid, self.past_state[i].pos
            ).as_str());
            json.push('}');
        }
        return json;
    }

    /// Returns the state of the board for a single grid.
    /// Used to interface with javascript
    pub fn get_board_by_grid(&self, grid: usize) -> Vec<i8> {
        self.board[grid].to_vec()
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
            owned: vec![0, 0, 0, 0, 0, 0, 0, 0, 0],
            full: vec![0, 0, 0, 0, 0, 0, 0, 0, 0],
            free: true,
            contested: 9,
            grid: 4,
            player: -1,
            turn: 0,
            winner: 0,
            active: true,
            past_state: Vec::with_capacity(81)
        }
    }

    /// Determines whether a given move is valid or not
    pub fn is_valid_move(&self, grid: usize, pos: usize) -> bool {
        // Returns false if the game is over
        if !self.active {
            return false;
        }
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
        let last_grid = self.past_state[self.turn - 1].grid as usize;
        return num_open == 8 || (last_grid != pos);
    }

    /// Returns all valid moves for a given grid
    pub fn get_valid_moves(&self, grid: usize) -> Vec<usize> {
        if !self.active {
            return vec![];
        }
        if !(self.free || self.grid == grid) {
            return vec![];
        } else if self.turn == 0 {
            let valid_moves: Vec<usize> = (0..9)
                .filter(|pos| *pos != grid)
                .filter(|pos| *pos != 4)
                .collect();
            return valid_moves;
        }
        let last_grid = self.past_state[self.turn - 1].grid as usize;
        let mut valid_moves: Vec<usize> = (0..9)
            .filter(|pos| *pos != last_grid)
            .filter(|pos| self.board[grid][*pos] == 0)
            .collect();
        if self.free || valid_moves.len() == 1 {
            if self.turn > 0 && self.board[grid][last_grid] == 0 {
                valid_moves.push(last_grid);
            }
        }
        valid_moves
    }

    /// Updates the board with the coordinate of a move
    /// WARNING: For performance, this does not check that the move is valid.
    /// Make sure to run `is_valid_move` before this function
    pub fn update(&mut self, grid: usize, pos: usize) {
        // Returns if the game is over
        if !self.active {
            return;
        }
        // Records the move being made
        self.past_state.push(Move{
            free: self.free, 
            grid: grid as u8, 
            pos: pos as u8
        });
        // Updates the board
        self.board[grid][pos] = self.player as i8;
        // If the grid is still contested, check for a three-in-a-row
        if self.owned[grid] == 0 && self.check_for_three(grid) {
            self.owned[grid] = self.player as i8;
            self.contested -= 1;
            // Check if either player has just won
            let score: isize = self.owned.iter().sum::<i8>() as isize;
            if score * self.player > self.contested as isize {
                self.winner = self.player;
                self.active = false;
            }
        }
        // Check if the grid just played in is now full
        let num_pieces: i8 = self.board[grid].iter()
            .map(|x| if *x >= 0 {*x} else {-x})
            .sum();
        if num_pieces == 9 {
            self.full[grid] = 1;
            // If no one owns the now-full grid, mark it as uncontested
            if self.owned[grid] == 0 {
                self.contested -= 1;
            }
            // If there are no more contested grids, get the winner
            if self.contested == 0 {
                self.active = false;
                let score: isize = self.owned.iter().sum::<i8>() as isize;
                if score > 0 {
                    self.winner = 1;
                } else if score < 0 {
                    self.winner = -1;
                } else {
                    self.winner = 0;
                }
            }
        }
        // Switch players
        self.player *= -1;
        // Update grid
        self.grid = pos;
        // Increment turn
        self.turn += 1;
        // Check if next move is free
        self.free = self.full[self.grid] != 0;
    }

    /// Checks if there is a three-in-a-row in a given grid
    pub fn check_for_three(&self, grid: usize) -> bool {
        // Checks vertical and horizontal threes
        for i in 0..3 {
            if (self.board[grid][i    ] + 
                self.board[grid][i + 3] + 
                self.board[grid][i + 6]) as isize == self.player * 3
            {
                return true;
            }
            if (self.board[grid][3*i    ] + 
                self.board[grid][3*i + 1] + 
                self.board[grid][3*i + 2]) as isize == self.player * 3
            {
                return true;
            }
        }
        // Checks the diagonals
        if (self.board[grid][0] + 
            self.board[grid][4] + 
            self.board[grid][8]) as isize == self.player * 3
        {
            return true;
        }
        if (self.board[grid][2] + 
            self.board[grid][4] + 
            self.board[grid][6]) as isize == self.player * 3
        {
            return true;
        }
        return false;
    }
}
