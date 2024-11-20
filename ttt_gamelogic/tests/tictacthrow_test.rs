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
    let ttt = TicTacThrow::new();
    assert_eq!(ttt.get_valid_moves(4), vec![0, 1, 2, 3, 5, 6, 7, 8]);
}
