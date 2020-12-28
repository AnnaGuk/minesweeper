import React from "react";
import { WindowHeader, WindowContent } from "react95";
import bugIcon from "../../assets/bug.svg";
import flagIcon from "../../assets/flag.svg";
import numberOne from "../../assets/numbers/one.svg";
import numberTwo from "../../assets/numbers/two.svg";
import numberThree from "../../assets/numbers/three.svg";
import numberFour from "../../assets/numbers/four.svg";
import numberFive from "../../assets/numbers/five.svg";
import numberSix from "../../assets/numbers/six.svg";
import numberSeven from "../../assets/numbers/seven.svg";
import CountersPanel from "../CountersPanel/index";
import { BoardGrid, StyledWindow, ButtonIcon, SmallButton } from "./styles";

const GameBoard = ({ board, dispatch, size, gameState, gameVariant }) => {
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
    <StyledWindow size={size}>
      <WindowHeader>Bugsweeper</WindowHeader>
      <WindowContent>
        <CountersPanel
          gameState={gameState}
          minesNumber={10}
          flagsNumber={0}
          dispatch={dispatch}
          gameVariant={gameVariant}
        />
        <BoardGrid>
          {board.map((row) =>
            row.map((column, id) => (
              <SmallButton
                size={size}
                square
                onClick={() =>
                  dispatch({
                    type: "openField",
                    row: column.row,
                    col: column.column,
                  })
                }
                onContextMenu={() =>
                  dispatch({
                    type: "toggleFlag",
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
                ) : column.isFlagged ? (
                  <ButtonIcon src={flagIcon} alt="f" />
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
