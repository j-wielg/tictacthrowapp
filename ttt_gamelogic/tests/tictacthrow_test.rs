use ttt_gamelogic::TicTacThrow;
use std::fs;

#[test]
fn it_converts_to_json() {
    let ttt = TicTacThrow::new();
    let string = ttt.jsonify();
    let expected = fs::read_to_string("tests/output/new_game.json")
        .expect("Failed to read test file!");
    let expected = expected.trim();
    assert_eq!(string, expected);
}

#[test]
fn it_checks_turn0_valid_moves() {
    let ttt = TicTacThrow::new();
    assert!(ttt.is_valid_move(0, 1), "Incorrectly flagged a valid move");
    assert!(ttt.is_valid_move(3, 5), "Incorrectly flagged a valid move");
    assert!(!ttt.is_valid_move(4, 4), "Failed to check for existing piece");
    assert!(!ttt.is_valid_move(3, 4), "Failed to prevent turn 0 center move");
    assert!(!ttt.is_valid_move(3, 3), "Failed to prevent turn 0 self-square");
}

#[test]
fn it_finds_valid_moves() {
    let mut ttt = TicTacThrow::new();
    // Checks if it skips squares which are already chosen
    assert_eq!(ttt.get_valid_moves(4), vec![0, 1, 2, 3, 5, 6, 7, 8]);
    assert_eq!(ttt.get_valid_moves(0), vec![1, 2, 3, 5, 6, 7, 8], 
        "Fails to account for turn 0 weirdness");
    // Checks if it prevents the opponent from playing the same grid twice
    ttt.update(0, 8);
    assert_eq!(ttt.get_valid_moves(0), vec![], 
        "Fails to return [] if grid != self.grid");
    assert_eq!(ttt.get_valid_moves(8), vec![1, 2, 3, 4, 5, 6, 7, 8],
        "Fails to avoid double grid");
}

#[test]
fn it_updates_correctly() {
    let mut ttt = TicTacThrow::new();
    ttt.update(0, 8);
    ttt.update(8, 2);
    ttt.update(2, 4);
    ttt.update(4, 0);
    ttt.update(0, 0);
    ttt.update(0, 6);
    ttt.update(6, 7);
    ttt.update(7, 0);
    ttt.update(0, 4);
    let expected = fs::read_to_string("tests/output/three_in_a_row.json")
        .expect("Failed to read test file!");
    let expected = expected.trim();
    assert_eq!(ttt.jsonify(), expected);
}
