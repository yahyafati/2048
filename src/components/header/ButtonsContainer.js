import React from "react";

const ButtonsContainer = ({ setupNewGame }) => {
    return (
        <div className="buttons-container">
            <button onClick={(e) => setupNewGame()}>New Game</button>
            <button>Undo</button>
        </div>
    );
};

export default ButtonsContainer;
