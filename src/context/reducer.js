import {
  renderBoard,
  getBoardSizeFromBoardVariant,
  revealBoard,
  openEmpty,
  findUnrevealedCells,
  findBugs,
  findFlags,
} from "./helpers";

const createInitState = (variant) => {
  const { bombCount } = getBoardSizeFromBoardVariant(variant);
  const board = renderBoard(variant);
  return {
    gameVariant: variant,
    gameState: "progress",
    minesNumber: bombCount,
    flagsNumber: 0,
    board,
  };
};

export const init = (variant) => {
  return createInitState(variant);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "openField":
      let status = "progress";
      let updatedBoard = state.board;
      const unrevealedCells = findUnrevealedCells(updatedBoard);
      if (!updatedBoard[action.row][action.col].isFlagged) {
        if (updatedBoard[action.row][action.col].isBomb) {
          status = "lost";
          updatedBoard[action.row][action.col].isColored = true;
          updatedBoard = revealBoard(updatedBoard);
        } else if (updatedBoard[action.row][action.col].isEmpty) {
          openEmpty(action.row, action.col, state.board, state.gameVariant);
        } else updatedBoard[action.row][action.col].isOpen = true;
        if (unrevealedCells.length === state.minesNumber) {
          status = "won";
          updatedBoard = revealBoard(updatedBoard);
        }
      }
      return {
        ...state,
        board: updatedBoard,
        gameState: status,
      };
    case "toggleFlag":
      let flags = state.flagsNumber;
      let bugs = state.minesNumber;
      let gameStatus = state.gameState;
      let newBoard = state.board.map((stateRow) =>
        stateRow.map((stateCol) => {
          if (
            stateCol.row === action.row &&
            stateCol.column === action.col &&
            !stateCol.isOpen
          ) {
            if (stateCol.isFlagged) {
              flags--;
              if (stateCol.isBomb) {
                bugs++;
              }
              return { ...stateCol, isFlagged: false };
            } else {
              flags++;
              if (stateCol.isBomb) {
                bugs--;
              }
              return { ...stateCol, isFlagged: true };
            }
          } else {
            return stateCol;
          }
        })
      );
      if (bugs === 0) {
        let bugArray = findBugs(newBoard);
        let flagArray = findFlags(newBoard);
        if (JSON.stringify(bugArray) === JSON.stringify(flagArray)) {
          gameStatus = "won";
          newBoard = revealBoard(newBoard);
        }
      }
      return {
        ...state,
        board: newBoard,
        flagsNumber: flags,
        minesNumber: bugs,
        gameState: gameStatus,
      };
    case "reset":
      return init(action.variant);
    default:
      return state;
  }
};
