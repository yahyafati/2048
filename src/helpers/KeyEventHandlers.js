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

export const shiftToLeft = (board) => {
    const mBoard = to_multi_array(board);
    /*
        4 0 0 0
    */
    let prevIndex = 0;
    mBoard.forEach((row, i) => {
        prevIndex = 0;
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
    });
    return mBoard.flat();
};

export const shiftToRight = (board) => {
    const mBoard = to_multi_array(board);

    let prevIndex = 0;
    mBoard.forEach((row, i) => {
        prevIndex = row.length - 1;
        for (let j = row.length - 2; j > -1; j--) {
            const item = row[j];
            if (item === 0) continue;
            if (row[prevIndex] === 0) {
                row[j] = 0;
                row[prevIndex] = item;
            } else if (item === row[prevIndex]) {
                row[j] = 0;
                row[prevIndex--]++;
            } else {
                row[j] = 0;
                row[--prevIndex] = item;
            }
        }
    });
    return mBoard.flat();
};

export const shiftToUp = (board) => {
    const mBoard = to_multi_array(board);
    /*
        4 0 0 0
    */
    let prevIndex;
    for (let colIndex = 0; colIndex < 4; colIndex++) {
        prevIndex = 0;
        const column = getColumn(mBoard, colIndex);
        for (let j = 1; j < column.length; j++) {
            const item = column[j];
            if (item === 0) continue;
            if (column[prevIndex] === 0) {
                column[j] = 0;
                column[prevIndex] = item;
            } else if (item === column[prevIndex]) {
                column[j] = 0;
                column[prevIndex++]++;
            } else {
                column[j] = 0;
                column[++prevIndex] = item;
            }
        }
        setColumn(column, mBoard, colIndex);
    }
    return mBoard.flat();
};

export const shiftToDown = (board) => {
    const mBoard = to_multi_array(board);

    let prevIndex;
    for (let colIndex = 0; colIndex < 4; colIndex++) {
        const column = getColumn(mBoard, colIndex);
        prevIndex = column.length - 1;
        for (let j = column.length - 2; j > -1; j--) {
            const item = column[j];
            if (item === 0) continue;
            if (column[prevIndex] === 0) {
                column[j] = 0;
                column[prevIndex] = item;
            } else if (item === column[prevIndex]) {
                column[j] = 0;
                column[prevIndex--]++;
            } else {
                column[j] = 0;
                column[--prevIndex] = item;
            }
        }
        setColumn(column, mBoard, colIndex);
    }
    return mBoard.flat();
};
