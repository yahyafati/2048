import React, { useState, useEffect } from "react";
import Board from "./components/board/Board";
import Footer from "./components/footer/Footer";
import ButtonsContainer from "./components/header/ButtonsContainer";
import Header from "./components/header/Header";
import { arraysEqual } from "./helpers/Helpers";
import {
    shiftToDown,
    shiftToLeft,
    shiftToRight,
    shiftToUp,
} from "./helpers/KeyEventHandlers";

const App = () => {
    const [score, setScore] = useState(12535);
    const [highScore, setHighScore] = useState(4257896);
    const [board, setBoard] = useState(
        localStorage.getItem("board")
            ? JSON.parse(localStorage.getItem("board"))
            : [...Array(16)].map(() => 0)
    );

    useEffect(() => {
        localStorage.setItem("board", JSON.stringify(board));
    }, [board]);

    const genNewNumber = () => {
        const index = getIndex();
        if (index === -1) return;
        setBoard((current) => {
            current[index] = 1;
            return [...current];
        });
    };

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
        setBoard([...Array(16)].map(() => 0));
        setScore(0);
        genNewNumber();
        genNewNumber();
        localStorage.removeItem("prevBoard");
    };

    const undoMove = () => {
        if (localStorage.getItem("prevBoard")) {
            setBoard(JSON.parse(localStorage.getItem("prevBoard")));
            localStorage.removeItem("prevBoard");
        }
    };

    const handleKeyDown = (e) => {
        // console.log(e.keyCode, e.key);
        const KEYS = {
            37: shiftToLeft,
            38: shiftToUp,
            39: shiftToRight,
            40: shiftToDown,
        };
        if (e.keyCode in KEYS) {
            const newBoard = KEYS[e.keyCode](board);
            if (!arraysEqual(newBoard, board)) {
                // console.log(newBoard, board);
                localStorage.setItem("prevBoard", JSON.stringify(board));
                setBoard(newBoard);
                // setNext((current) => !current);
                genNewNumber();
            }
        }
    };
    return (
        <div className="app" tabIndex="0" onKeyDown={handleKeyDown}>
            <Header score={score} highScore={highScore} />
            <ButtonsContainer setupNewGame={setupNewGame} undoMove={undoMove} />
            <Board board={board} />
            <Footer />
        </div>
    );
};
export default App;
