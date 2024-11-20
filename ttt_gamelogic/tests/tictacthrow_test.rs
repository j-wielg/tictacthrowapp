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
