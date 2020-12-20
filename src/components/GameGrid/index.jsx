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

const GameBoard = ({ boardSize }) => {
  const createBoard = (size) => {
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
        };
      }
    }

    return arr;
  };

  const generateBombs = (arr, bombMaxCount, boardSize) => {
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

  const countNeighbouringBombs = (arr, maxNum) => {
    for (let i = 0; i < maxNum; i++) {
      for (let j = 0; j < maxNum; j++) {
        if (arr[i][j].isBomb === true) {
          //mark upper rows
          if (
            i > 0 &&
            j > 0 &&
            arr[i - 1][j - 1] &&
            !arr[i - 1][j - 1].isBomb
          ) {
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

  const initBoard = (bombCount, boardSize) => {
    const board = createBoard(boardSize);
    const boardWithBombs = generateBombs(board, bombCount, boardSize);
    const finalBoard = countNeighbouringBombs(boardWithBombs, boardSize);
    return finalBoard;
  };

  const board = [...initBoard(10, boardSize)];

  const openField = (row, col) => {
    board[row][col].isOpen = true;
    console.log(board[row][col]);
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
                onClick={() => openField(column.row, column.column)}
                key={`button${id}`}
                variant={column.isOpen ? "flat" : "default"}
              >
                {column.isOpen ? (
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
