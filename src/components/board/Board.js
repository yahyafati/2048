import React, { useState } from "react";
import { GAME_STATUSES } from "../../App";
import {
    shiftToDown,
    shiftToLeft,
    shiftToRight,
    shiftToUp,
} from "../../helpers/KeyEventHandlers";
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
const Board = ({
    board,
    gameStatus,
    setGameStatus,
    setupNewGame,
    postShift,
}) => {
    if (!isValidBoard(board)) return <></>;

    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

    const handleTouchStart = (e) => {
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    };

    const handleTouchMove = (e) => {
        setTouchEnd({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
        });
    };

    const handleTouchEnd = (e) => {
        // e.preventDefault();
        const topDown = touchEnd.y - touchStart.y;
        const leftRight = touchEnd.x - touchStart.x;
        if (touchEnd.x === 0 && touchEnd.y === 0) {
            setTouchStart({ x: 0, y: 0 });
            return;
        }
        console.log(touchStart, touchEnd, topDown, leftRight);
        if (leftRight > 20) {
            // shiftLeft
            const board_shifted = shiftToRight(board);
            postShift(board_shifted);
            // console.log("shiftRight");
        } else if (leftRight < -20) {
            // shiftRight
            const board_shifted = shiftToLeft(board);
            postShift(board_shifted);
            console.log("shiftLeft");
        } else if (topDown > 20) {
            const board_shifted = shiftToDown(board);
            postShift(board_shifted);
            // shiftDown
        } else if (topDown < -20) {
            // shiftUp
            const board_shifted = shiftToUp(board);
            postShift(board_shifted);
            // console.log("shiftUp");
        }
        setTouchStart({ x: 0, y: 0 });
        setTouchEnd({ x: 0, y: 0 });
    };

    return (
        <div
            className="board"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onClick={(e) => console.log(e.clientX)}
        >
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
