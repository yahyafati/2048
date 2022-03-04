import React, { useState, useEffect } from "react";
import Board from "./components/board/Board";
import Footer from "./components/footer/Footer";
import ButtonsContainer from "./components/header/ButtonsContainer";
import Header from "./components/header/Header";
import { arraysEqual } from "./helpers/Helpers";
import {
    has_moves_available,
    shiftToDown,
    shiftToLeft,
    shiftToRight,
    shiftToUp,
} from "./helpers/KeyEventHandlers";

export const GAME_STATUSES = {
    IN_GAME: 0,
    GOT_TO_2048: 1,
    POST_2048: 2,
    GAME_OVER: 3,
};

const App = () => {
    const [score, setScore] = useState(
        localStorage.getItem("score")
            ? parseInt(localStorage.getItem("score"))
            : 0
    );
    const [highScore, setHighScore] = useState(
        localStorage.getItem("highScore")
            ? parseInt(localStorage.getItem("highScore"))
            : 0
    );
    const [board, setBoard] = useState(
        localStorage.getItem("board")
            ? JSON.parse(localStorage.getItem("board"))
            : [...Array(16)].map(() => 0)
    );
    const [next, setNext] = useState(false);
    const [newLoad, setNewLoad] = useState(true);
    const [gameStatus, setGameStatus] = useState(
        localStorage.getItem("gameStatus")
            ? parseInt(localStorage.getItem("gameStatus"))
            : GAME_STATUSES.IN_GAME
    );

    useEffect(() => {
        if (!has_moves_available(board)) {
            console.log("Game Is Over");
            setGameStatus(GAME_STATUSES.GAME_OVER);
        }
    }, [board]);

    useEffect(() => {
        localStorage.setItem("board", JSON.stringify(board));
        localStorage.setItem("highScore", String(highScore));
        localStorage.setItem("gameStatus", String(gameStatus));
    }, [board, highScore, gameStatus]);

    useEffect(() => {
        localStorage.setItem("score", String(score));
        if (score > highScore) setHighScore(score);
    }, [score]);

    useEffect(() => {
        if (newLoad) return;
        const index = getIndex();
        if (index === -1) return;
        setBoard((current) => {
            current[index] = 1;
            return [...current];
        });
    }, [next]);

    const getIndex = () => {
        if (![...board].includes(0)) return -1;
        let currentIndex = 0;
        // console.log(board);
        do {
            currentIndex = parseInt(Math.random() * 16);
        } while (board[currentIndex] !== 0);
        return currentIndex;
    };

    const setupNewGame = () => {
        if (
            gameStatus !== GAME_STATUSES.GAME_OVER &&
            // gameStatus === GAME_STATUSES.GOT_TO_2048 ||
            !confirm(
                "You are going to lose your current progress. Are you sure?"
            )
        )
            return;
        setBoard([...Array(16)].map(() => 0));
        setScore(0);
        setGameStatus(GAME_STATUSES.IN_GAME);
        setNewLoad(false);
        setNext((current) => !current);
        localStorage.removeItem("prevBoard");
    };

    const undoMove = () => {
        if (localStorage.getItem("prevBoard")) {
            setBoard(JSON.parse(localStorage.getItem("prevBoard")));
            localStorage.removeItem("prevBoard");
        }
    };

    const handleKeyDown = async (e) => {
        e.preventDefault();
        // console.log(e.keyCode, e.altKey);
        const KEYS = {
            37: shiftToLeft,
            38: shiftToUp,
            39: shiftToRight,
            40: shiftToDown,
        };
        if (e.keyCode in KEYS) {
            const board_shifted = KEYS[e.keyCode](board);
            // console.log(board_shifted);
            const newBoard = board_shifted.board;
            if (!arraysEqual(newBoard, board)) {
                localStorage.setItem("prevBoard", JSON.stringify(board));
                setNewLoad(false);
                setBoard(newBoard);
                // 2 ** 11 = 2048
                // console.log(newBoard);
                if (
                    gameStatus === GAME_STATUSES.IN_GAME &&
                    [...newBoard].includes(11)
                ) {
                    // console.log(gameStatus, GAME_STATUSES.IN_GAME, newBoard);
                    setGameStatus(GAME_STATUSES.GOT_TO_2048);
                } else if (gameStatus === GAME_STATUSES.GOT_TO_2048) {
                    setGameStatus(GAME_STATUSES.POST_2048);
                }

                setScore((current) => current + board_shifted.score);
                setNext((current) => !current);
            }
        } else if (e.keyCode === 90 && e.ctrlKey) {
            undoMove();
        } else if (e.keyCode === 78 && e.altKey) {
            setupNewGame();
        }
    };

    // [0,2,0,1,0,3,0,0,10,2,3,0,10,1,2,2]

    return (
        <div className="app" tabIndex="0" onKeyDown={handleKeyDown}>
            <Header score={score} highScore={highScore} />
            <ButtonsContainer setupNewGame={setupNewGame} undoMove={undoMove} />
            <Board
                board={board}
                gameStatus={gameStatus}
                setGameStatus={setGameStatus}
                setupNewGame={setupNewGame}
            />
            <Footer />
        </div>
    );
};
export default App;
