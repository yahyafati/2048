const to_multi_array = (board) => {
    const res = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    [...board].forEach((item, index) => {
        const i = parseInt(index / 4);
        const j = index % 4;
        res[i][j] = item;
    });
    return res;
};

const getColumn = (mBoard, colIndex) => {
    const res = [0, 0, 0, 0];
    mBoard.forEach((row, rowIndex) => (res[rowIndex] = row[colIndex]));
    return res;
};

const setColumn = (column, mBoard, colIndex) => {
    mBoard.forEach((row, rowIndex) => (row[colIndex] = column[rowIndex]));
};

const shift = (row, isPossible = false, reverse = false) => {
    if (reverse) row.reverse();

    let prevIndex = 0;
    let score = 0;
    for (let j = 1; j < row.length; j++) {
        const item = row[j];
        if (score > 0 && isPossible) {
            return score;
        }
        if (item === 0) continue;
        if (row[prevIndex] === 0) {
            row[j] = 0;
            row[prevIndex] = item;
        } else if (item === row[prevIndex]) {
            row[j] = 0;
            row[prevIndex++]++;
            score += Math.pow(2, item) * 2;
        } else {
            row[j] = 0;
            row[++prevIndex] = item;
        }
    }

    if (reverse) row.reverse();
    return score;
};

export const shiftToLeft = (board, isPossible = false) => {
    const mBoard = to_multi_array(board);
    let score = 0;
    mBoard.forEach((row) => (score += shift(row, isPossible)));
    return { board: mBoard.flat(), score };
};

export const shiftToRight = (board, isPossible = false) => {
    const mBoard = to_multi_array(board);
    let score = 0;
    mBoard.forEach((row) => (score += shift(row, isPossible, true)));
    return { board: mBoard.flat(), score };
};

export const shiftToUp = (board, isPossible = false) => {
    const mBoard = to_multi_array(board);
    let score = 0;
    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = getColumn(mBoard, colIndex);
        score += shift(column, isPossible);
        setColumn(column, mBoard, colIndex);
    }
    return { board: mBoard.flat(), score };
};

export const shiftToDown = (board, isPossible = false) => {
    const mBoard = to_multi_array(board);
    let score = 0;
    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = getColumn(mBoard, colIndex);
        score += shift(column, isPossible, true);
        setColumn(column, mBoard, colIndex);
    }
    return { board: mBoard.flat(), score };
};

export const has_moves_available = (board) => {
    // console.log("B", board);
    // console.log("L", shiftToLeft(board, true));
    // console.log("R", shiftToRight(board, true));
    // console.log("U", shiftToUp(board, true));
    // console.log("D", shiftToDown(board, true));
    // console.log("0", [...board].includes(0));
    return (
        [...board].includes(0) ||
        shiftToLeft(board, true).score > 0 ||
        shiftToRight(board, true).score > 0 ||
        shiftToUp(board, true).score > 0 ||
        shiftToDown(board, true).score > 0
    );
};
