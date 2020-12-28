import { renderBoard } from "./helpers";

export const init = (variant) => {
  return renderBoard(variant);
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "openField":
      return state.map((stateRow) =>
        stateRow.map((stateCol) => {
          if (stateCol.row === action.row && stateCol.column === action.col) {
            return { ...stateCol, isOpen: true };
          } else {
            return stateCol;
          }
        })
      );
    case "toggleFlag":
      return state.map((stateRow) =>
        stateRow.map((stateCol) => {
          if (stateCol.row === action.row && stateCol.column === action.col) {
            return stateCol.isFlagged
              ? { ...stateCol, isFlagged: false }
              : { ...stateCol, isFlagged: true };
          } else {
            return stateCol;
          }
        })
      );
    case "reset":
      return init(action.variant);
    default:
      return state;
  }
};
