import React from "react";
import { WindowHeader, WindowContent } from "react95";
import bugIcon from "../../assets/bug.svg";
import numberOne from "../../assets/numbers/one.svg";
import numberTwo from "../../assets/numbers/two.svg";
import numberThree from "../../assets/numbers/three.svg";
import numberFour from "../../assets/numbers/four.svg";
import numberFive from "../../assets/numbers/five.svg";
import numberSix from "../../assets/numbers/six.svg";
import numberSeven from "../../assets/numbers/seven.svg";
import CountersPanel from "../CountersPanel/index";
import { BoardGrid, StyledWindow, ButtonIcon, SmallButton } from "./styles";
import { initBoard } from "./helpers";
import { reducer } from "./reducer";

const GameBoard = ({ boardSize }) => {
  const initialState = initBoard(10, boardSize);

  const [board, dispatch] = React.useReducer(reducer, initialState);

  const renderNumberSource = (num) => {
    switch (num) {
      case 1:
        return numberOne;
      case 2:
        return numberTwo;
      case 3:
        return numberThree;
      case 4:
        return numberFour;
      case 5:
        return numberFive;
      case 6:
        return numberSix;
      case 7:
        return numberSeven;
      default:
        break;
    }
  };

  return (
    <StyledWindow>
      <WindowHeader>Bugsweeper</WindowHeader>
      <WindowContent>
        <CountersPanel minesNumber={10} flagsNumber={0} />
        <BoardGrid>
          {board.map((row) =>
            row.map((column, id) => (
              <SmallButton
                square
                onClick={() =>
                  dispatch({
                    type: "openField",
                    row: column.row,
                    col: column.column,
                  })
                }
                key={`button${id}`}
                variant={column.isOpen ? "flat" : "default"}
              >
                {column.isOpen && !column.isEmpty ? (
                  <ButtonIcon
                    src={
                      column.isBomb
                        ? bugIcon
                        : renderNumberSource(column.neighbouringBombCount)
                    }
                    alt={
                      column.isBomb ? "*" : `${column.neighbouringBombCount}`
                    }
                  />
                ) : (
                  " "
                )}
              </SmallButton>
            ))
          )}
        </BoardGrid>
      </WindowContent>
    </StyledWindow>
  );
};

export default GameBoard;
