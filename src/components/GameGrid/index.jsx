import React from "react";
import {
  Window,
  WindowHeader,
  WindowContent,
  Panel,
  Counter,
  Avatar,
  Button,
} from "react95";
import styled from "styled-components";
import bugIcon from "../../assets/bug.svg";
import smileyFace from "../../assets/smileyface.svg";
import numberOne from "../../assets/numbers/one.svg";
import numberTwo from "../../assets/numbers/two.svg";
import numberThree from "../../assets/numbers/three.svg";
import numberFour from "../../assets/numbers/four.svg";
import numberFive from "../../assets/numbers/five.svg";
import numberSix from "../../assets/numbers/six.svg";
import numberSeven from "../../assets/numbers/seven.svg";

const BoardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: center;
`;

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

  const renderNumberAvatarSource = (num) => {
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

  return (
    <Window
      style={{
        width: 300,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <WindowHeader>Bugsweeper</WindowHeader>
      <WindowContent>
        <Panel
          variant="well"
          style={{
            padding: 7,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Counter value={10} size="sm" style={{ maxWidth: 50, padding: 4 }} />
          <Button square>
            <img src={smileyFace} style={{ width: 20, height: 20 }} alt=":)" />
          </Button>
          <Counter value={0} size="sm" style={{ maxWidth: 50, padding: 4 }} />
        </Panel>
        <BoardGrid>
          {board.map((row) =>
            row.map((column, id) => {
              if (column.isBomb) {
                return (
                  <Avatar square src={bugIcon} size={32} key={`bug${id}`} />
                );
              } else if (column.neighbouringBombCount > 0) {
                return (
                  <Avatar square size={32} key={`counter${id}`}>
                    <img
                      src={renderNumberAvatarSource(
                        column.neighbouringBombCount
                      )}
                      style={{ height: 20, width: 20 }}
                      alt={column.neighbouringBombCount}
                    />
                  </Avatar>
                );
              } else {
                return <Avatar square size={32} key={`button${id}`} />;
              }
            })
          )}
        </BoardGrid>
      </WindowContent>
    </Window>
  );
};

export default GameBoard;
