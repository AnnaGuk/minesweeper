import { renderBoard, getBoardSizeFromBoardVariant } from "./helpers";

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

export const initialState = createInitState("beginner");

export const init = (variant) => {
  return createInitState(variant);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "openField":
      return {
        ...state,
        board: state.board.map((stateRow) =>
          stateRow.map((stateCol) => {
            if (stateCol.row === action.row && stateCol.column === action.col) {
              return { ...stateCol, isOpen: true };
            } else {
              return stateCol;
            }
          })
        ),
      };
    case "toggleFlag":
      let flagsNum = 0;
      return {
        ...state,
        board: state.board.map((stateRow) =>
          stateRow.map((stateCol) => {
            if (stateCol.row === action.row && stateCol.column === action.col) {
              if (stateCol.isFlagged) {
                flagsNum--;
                return { ...stateCol, isFlagged: false };
              } else {
                flagsNum++;
                return { ...stateCol, isFlagged: true };
              }
            } else {
              return stateCol;
            }
          })
        ),
        flagsNumber: state.flagsNumber + flagsNum,
      };
    case "reset":
      return init(action.variant);
    default:
      return state;
  }
};
