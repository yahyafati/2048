import React from "react";

const GameOver = ({ setupNewGame }) => {
    return (
        <div className="gameover-div">
            <h2 className="congrats">Game Over</h2>
            {/* <h3 className="desc">
                You've got to <span className="_2048">2048</span>
            </h3> */}
            <div className="buttons">
                <button onClick={() => setupNewGame()}>New Game</button>
            </div>
        </div>
    );
};

export default GameOver;
