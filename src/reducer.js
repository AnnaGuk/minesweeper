import {
  renderBoard,
  getBoardSizeFromBoardVariant,
  revealBoard,
  openEmpty,
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
      if (!updatedBoard[action.row][action.col].isFlagged) {
        if (updatedBoard[action.row][action.col].isBomb) {
          status = "lost";
          updatedBoard[action.row][action.col].isColored = true;
          updatedBoard = revealBoard(updatedBoard);
        } else if (updatedBoard[action.row][action.col].isEmpty) {
          openEmpty(action.row, action.col, state.board, state.gameVariant);
        } else updatedBoard[action.row][action.col].isOpen = true;
      }
      return {
        ...state,
        board: updatedBoard,
        gameState: status,
      };
    case "toggleFlag":
      let flagsNum = 0;
      let disarmedBombs = 0;
      return {
        ...state,
        board: state.board.map((stateRow) =>
          stateRow.map((stateCol) => {
            if (
              stateCol.row === action.row &&
              stateCol.column === action.col &&
              !stateCol.isOpen
            ) {
              if (stateCol.isFlagged) {
                flagsNum--;
                if (stateCol.isBomb) {
                  disarmedBombs--;
                }
                return { ...stateCol, isFlagged: false };
              } else {
                flagsNum++;
                if (stateCol.isBomb) {
                  disarmedBombs++;
                }
                return { ...stateCol, isFlagged: true };
              }
            } else {
              return stateCol;
            }
          })
        ),
        flagsNumber: state.flagsNumber + flagsNum,
        minesNumber: state.minesNumber - disarmedBombs,
      };
    case "reset":
      return init(action.variant);
    default:
      return state;
  }
};
