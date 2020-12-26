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
    default:
      return state;
  }
};
