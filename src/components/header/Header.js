import React from "react";

const Header = ({ score, highScore }) => {
    return (
        <header>
            <h1 className="title">2048</h1>
            <div className="scores-container">
                <div className="score">
                    High Score
                    <b>{highScore}</b>
                </div>
                <div className="score">
                    Score
                    <b>{score}</b>
                </div>
            </div>
        </header>
    );
};

export default Header;
