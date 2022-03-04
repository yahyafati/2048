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

const shift = (row, reverse = false) => {
    if (reverse) row.reverse();
    let prevIndex = 0;
    for (let j = 1; j < row.length; j++) {
        const item = row[j];
        if (item === 0) continue;
        if (row[prevIndex] === 0) {
            row[j] = 0;
            row[prevIndex] = item;
        } else if (item === row[prevIndex]) {
            row[j] = 0;
            row[prevIndex++]++;
        } else {
            row[j] = 0;
            row[++prevIndex] = item;
        }
    }
    if (reverse) row.reverse();
};

export const shiftToLeft = (board) => {
    const mBoard = to_multi_array(board);
    mBoard.forEach((row) => shift(row));
    return mBoard.flat();
};

export const shiftToRight = (board) => {
    const mBoard = to_multi_array(board);

    mBoard.forEach((row) => shift(row, true));
    return mBoard.flat();
};

export const shiftToUp = (board) => {
    const mBoard = to_multi_array(board);
    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = getColumn(mBoard, colIndex);
        shift(column);
        setColumn(column, mBoard, colIndex);
    }
    return mBoard.flat();
};

export const shiftToDown = (board) => {
    const mBoard = to_multi_array(board);

    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = getColumn(mBoard, colIndex);
        shift(column, true);
        setColumn(column, mBoard, colIndex);
    }
    return mBoard.flat();
};
