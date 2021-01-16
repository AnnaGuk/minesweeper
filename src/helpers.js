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
