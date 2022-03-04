import React from "react";

const ButtonsContainer = ({ setupNewGame, undoMove }) => {
    return (
        <div className="buttons-container">
            <button onClick={setupNewGame}>New Game</button>
            <button onClick={undoMove}>Undo</button>
        </div>
    );
};

export default ButtonsContainer;
