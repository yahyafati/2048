import React from "react";
import { GAME_STATUSES } from "../../App";
import GameOver from "./GameOver";
import ReachedGoal from "./ReachedGoal";

const CELL_COLORS = [
    "",
    "#80ceff",
    "#47b8ff",
    "#00deb2",
    "#10c4a1",
    "#52ffde",
    "#00eb17",
    "#4aff5c",
    "#ebff33",
    "#efff61",
    "#ff956b",
    "#ffea00",
    "#ff75d1",
    "#cc85b4",
    "#9c9c9c",
    "#bfbfbf",
    "#ffffff",
];

const isValidBoard = (board) => {
    if (typeof board !== "object") return false;
    if (board.length !== 16) return false;
    for (const i of board) {
        if (typeof i !== "number") return false;
    }
    return true;
};
const Board = ({ board, gameStatus, setGameStatus, setupNewGame }) => {
    if (!isValidBoard(board)) return <></>;
    return (
        <div className="board">
            {gameStatus === GAME_STATUSES.GOT_TO_2048 && (
                <ReachedGoal
                    setGameStatus={setGameStatus}
                    setupNewGame={setupNewGame}
                />
            )}
            {gameStatus === GAME_STATUSES.GAME_OVER && (
                <GameOver setupNewGame={setupNewGame} />
            )}
            {[...Array(16).keys()].map((index) => {
                const item = board[index];
                return (
                    <div className="cell" key={index}>
                        {item !== 0 && (
                            <div
                                style={{ backgroundColor: CELL_COLORS[item] }}
                                className="content"
                            >
                                {Math.pow(2, item)}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Board;
