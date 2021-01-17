export const createBoard = (size) => {
  const arr = [];

  for (let i = 0; i < size; i++) {
    arr[i] = [];
    for (let j = 0; j < size; j++) {
      arr[i][j] = {
        isBomb: false,
        isEmpty: true,
        isFlagged: false,
        neighbouringBombCount: 0,
        isOpen: false,
        row: i,
        column: j,
        isColored: false,
      };
    }
  }

  return arr;
};

export const generateBombs = (arr, bombMaxCount, boardSize) => {
  let bombCounter = 0;

  while (bombCounter < bombMaxCount) {
    const row = Math.floor(Math.random() * boardSize);
    const column = Math.floor(Math.random() * boardSize);

    if (!arr[row][column].isBomb) {
      arr[row][column].isEmpty = false;
      arr[row][column].isBomb = true;
      bombCounter++;
    }
  }

  return arr;
};

export const countNeighbouringBombs = (arr, maxNum) => {
  for (let i = 0; i < maxNum; i++) {
    for (let j = 0; j < maxNum; j++) {
      if (arr[i][j].isBomb === true) {
        //mark upper rows
        if (i > 0 && j > 0 && arr[i - 1][j - 1] && !arr[i - 1][j - 1].isBomb) {
          arr[i - 1][j - 1].isEmpty = false;
          arr[i - 1][j - 1].neighbouringBombCount++;
        }
        if (i > 0 && arr[i - 1][j] && !arr[i - 1][j].isBomb) {
          arr[i - 1][j].isEmpty = false;
          arr[i - 1][j].neighbouringBombCount++;
        }
        if (
          i > 0 &&
          j <= maxNum - 1 &&
          arr[i - 1][j + 1] &&
          !arr[i - 1][j + 1].isBomb
        ) {
          arr[i - 1][j + 1].isEmpty = false;
          arr[i - 1][j + 1].neighbouringBombCount++;
        }
        // check neighbouring columns
        if (j > 0 && arr[i][j - 1] && !arr[i][j - 1].isBomb) {
          arr[i][j - 1].isEmpty = false;
          arr[i][j - 1].neighbouringBombCount++;
        }
        if (j <= maxNum - 1 && arr[i][j + 1] && !arr[i][j + 1].isBomb) {
          arr[i][j + 1].isEmpty = false;
          arr[i][j + 1].neighbouringBombCount++;
        }
        //check next row
        if (
          i < maxNum - 1 &&
          j > 0 &&
          arr[i + 1][j - 1] &&
          !arr[i + 1][j - 1].isBomb
        ) {
          arr[i + 1][j - 1].isEmpty = false;
          arr[i + 1][j - 1].neighbouringBombCount++;
        }
        if (i < maxNum - 1 && arr[i + 1][j] && !arr[i + 1][j].isBomb) {
          arr[i + 1][j].isEmpty = false;
          arr[i + 1][j].neighbouringBombCount++;
        }
        if (
          i < maxNum - 1 &&
          j <= maxNum - 1 &&
          arr[i + 1][j + 1] &&
          !arr[i + 1][j + 1].isBomb
        ) {
          arr[i + 1][j + 1].isEmpty = false;
          arr[i + 1][j + 1].neighbouringBombCount++;
        }
      }
    }
  }
  return arr;
};

export const initBoard = (bombCount, boardSize) => {
  const board = createBoard(boardSize);
  const boardWithBombs = generateBombs(board, bombCount, boardSize);
  const finalBoard = countNeighbouringBombs(boardWithBombs, boardSize);
  console.log(finalBoard);
  return finalBoard;
};

export const getBoardSizeFromBoardVariant = (variant) => {
  switch (variant) {
    case "beginner":
      return { bombCount: 10, boardSize: 8 };
    case "intermediate":
      return { bombCount: 40, boardSize: 16 };
    case "expert":
      return { bombCount: 99, boardSize: 24 };
    default:
      return { bombCount: 10, boardSize: 8 };
  }
};

export const renderBoard = (variant) => {
  const { bombCount, boardSize } = getBoardSizeFromBoardVariant(variant);
  const initialState = initBoard(bombCount, boardSize);
  return initialState;
};

export const revealBoard = (board) => {
  return board.map((stateRow) =>
    stateRow.map((stateCol) => {
      return { ...stateCol, isOpen: true };
    })
  );
};

export const openEmpty = (x, y, board, variant) => {
  const { boardSize } = getBoardSizeFromBoardVariant(variant);
  const arrayToReveal = [];

  //top
  if (x > 0) {
    arrayToReveal.push(board[x - 1][y]);
  }
  //top right
  if (x > 0 && y < boardSize - 1) {
    arrayToReveal.push(board[x - 1][y + 1]);
  }
  //right
  if (y < boardSize - 1) {
    arrayToReveal.push(board[x][y + 1]);
  }
  //bottom right
  if (x < boardSize - 1 && y < boardSize - 1) {
    arrayToReveal.push(board[x + 1][y + 1]);
  }
  //bottom
  if (x < boardSize - 1) {
    arrayToReveal.push(board[x + 1][y]);
  }
  //bottom left
  if (x < boardSize - 1 && y > 0) {
    arrayToReveal.push(board[x + 1][y - 1]);
  }
  //left
  if (y > 0) {
    arrayToReveal.push(board[x][y - 1]);
  }
  //top left
  if (x > 0 && y > 0) {
    arrayToReveal.push(board[x - 1][y - 1]);
  }

  arrayToReveal.map((data) => {
    if (!data.isFlagged && !data.isOpen && !data.isBomb) {
      board[data.row][data.column].isOpen = true;
      if (data.isEmpty) {
        openEmpty(data.row, data.column, board, variant);
      }
    }
  });

  return board;
};

export const findUnrevealedCells = (board) => {
  const arrayOfClosed = [];
  board.map((row) =>
    row.map((cell) => {
      if (!cell.isOpen) {
        arrayOfClosed.push(cell);
      }
    })
  );
  return arrayOfClosed;
};

export const findBugs = (board) => {
  const arrayOfBugs = [];
  board.map((row) =>
    row.map((cell) => {
      if (cell.isBomb) {
        arrayOfBugs.push(cell);
      }
    })
  );
  return arrayOfBugs;
};

export const findFlags = (board) => {
  const arrayOfFlags = [];
  board.map((row) =>
    row.map((cell) => {
      if (cell.isFlagged) {
        arrayOfFlags.push(cell);
      }
    })
  );
  return arrayOfFlags;
};
