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
import { GameContext } from "../../AppContext";

const GameBoard = () => {
  const [state, dispatch] = React.useContext(GameContext);
  const { gameVariant, board } = state;

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

  const onRightButtonClick = (e, row, col) => {
    e.preventDefault();
    dispatch({
      type: "toggleFlag",
      row: row,
      col: col,
    });
  };

  return (
    <StyledWindow size={gameVariant}>
      <WindowHeader>Bugsweeper</WindowHeader>
      <WindowContent>
        <CountersPanel />
        <BoardGrid>
          {board.map((row) =>
            row.map((column, id) => (
              <SmallButton
                size={gameVariant}
                square
                onClick={() =>
                  dispatch({
                    type: "openField",
                    row: column.row,
                    col: column.column,
                  })
                }
                onContextMenu={(event) =>
                  onRightButtonClick(event, column.row, column.column)
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
