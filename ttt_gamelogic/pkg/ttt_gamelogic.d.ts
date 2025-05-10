/* tslint:disable */
/* eslint-disable */
export function greet(): void;
/**
 * Represents a single move in a game of tic-tac-throw
 */
export class Move {
  free(): void;
  free: boolean;
  grid: number;
  pos: number;
}
/**
 * A struct representing the standard Tic Tac Throw ruleset
 * Most fields can be directly set and read by JS. The exception is
 * `board`, which requires a getter.
 */
export class TicTacThrow {
  free(): void;
  /**
   * Converts the board to JSON format
   * @returns {string}
   */
  jsonify(): string;
  /**
   * Returns the state of the board for a single grid.
   * Used to interface with javascript
   * @param {number} grid
   * @returns {Int8Array}
   */
  get_board_by_grid(grid: number): Int8Array;
  /**
   * Generates an empty board object
   * @returns {TicTacThrow}
   */
  static new(): TicTacThrow;
  /**
   * Determines whether a given move is valid or not
   * @param {number} grid
   * @param {number} pos
   * @returns {boolean}
   */
  is_valid_move(grid: number, pos: number): boolean;
  /**
   * Returns all valid moves for a given grid
   * @param {number} grid
   * @returns {Uint32Array}
   */
  get_valid_moves(grid: number): Uint32Array;
  /**
   * Updates the board with the coordinate of a move
   * WARNING: For performance, this does not check that the move is valid.
   * Make sure to run `is_valid_move` before this function
   * @param {number} grid
   * @param {number} pos
   */
  update(grid: number, pos: number): void;
  /**
   * Checks if there is a three-in-a-row in a given grid
   * @param {number} grid
   * @returns {boolean}
   */
  check_for_three(grid: number): boolean;
/**
 * Determines whether or not the game is still running
 */
  active: boolean;
/**
 * Stores the number of un-owned grids
 */
  contested: number;
/**
 * Stores whether or not the game is "free"
 */
  free: boolean;
/**
 * Stores whether each grid is full
 */
  full: Uint8Array;
/**
 * Stores the current playable grid
 */
  grid: number;
/**
 * Stores the owner of each grid
 */
  owned: Int8Array;
/**
 * Stores the past moves that have been made
 */
  past_state: (Move)[];
/**
 * Stores whose turn it is (1 for p1, -1 for p2)
 */
  player: number;
/**
 * Stores how many turns have passed
 */
  turn: number;
/**
 * Stores which player has won
 */
  winner: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_move_free: (a: number, b: number) => void;
  readonly __wbg_get_move_free: (a: number) => number;
  readonly __wbg_set_move_free: (a: number, b: number) => void;
  readonly __wbg_get_move_grid: (a: number) => number;
  readonly __wbg_set_move_grid: (a: number, b: number) => void;
  readonly __wbg_get_move_pos: (a: number) => number;
  readonly __wbg_set_move_pos: (a: number, b: number) => void;
  readonly __wbg_tictacthrow_free: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_owned: (a: number) => Array;
  readonly __wbg_set_tictacthrow_owned: (a: number, b: number, c: number) => void;
  readonly __wbg_get_tictacthrow_full: (a: number) => Array;
  readonly __wbg_set_tictacthrow_full: (a: number, b: number, c: number) => void;
  readonly __wbg_get_tictacthrow_free: (a: number) => number;
  readonly __wbg_set_tictacthrow_free: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_contested: (a: number) => number;
  readonly __wbg_set_tictacthrow_contested: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_grid: (a: number) => number;
  readonly __wbg_set_tictacthrow_grid: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_player: (a: number) => number;
  readonly __wbg_set_tictacthrow_player: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_turn: (a: number) => number;
  readonly __wbg_set_tictacthrow_turn: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_winner: (a: number) => number;
  readonly __wbg_set_tictacthrow_winner: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_active: (a: number) => number;
  readonly __wbg_set_tictacthrow_active: (a: number, b: number) => void;
  readonly __wbg_get_tictacthrow_past_state: (a: number) => Array;
  readonly __wbg_set_tictacthrow_past_state: (a: number, b: number, c: number) => void;
  readonly tictacthrow_jsonify: (a: number) => Array;
  readonly tictacthrow_get_board_by_grid: (a: number, b: number) => Array;
  readonly tictacthrow_new: () => number;
  readonly tictacthrow_is_valid_move: (a: number, b: number, c: number) => number;
  readonly tictacthrow_get_valid_moves: (a: number, b: number) => Array;
  readonly tictacthrow_update: (a: number, b: number, c: number) => void;
  readonly tictacthrow_check_for_three: (a: number, b: number) => number;
  readonly greet: () => void;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
