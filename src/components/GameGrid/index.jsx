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
        arr[row][column].isBomb = true;
        bombCounter++;
      }
    }

    return arr;
  };

  const initBoard = (bombCount, boardSize) => {
    const board = createBoard(boardSize);
    const boardWithBombs = generateBombs(board, bombCount, boardSize);
    return boardWithBombs;
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
            row.map((column, id) =>
              column.isBomb ? (
                <Avatar square src={bugIcon} size={32} />
              ) : (
                <Avatar square size={32} key={`button${id}`} />
              )
            )
          )}
        </BoardGrid>
      </WindowContent>
    </Window>
  );
};

export default GameBoard;
