import React from "react";
import { AppBar, Button, ListItem } from "react95";
import { StyledToolbar, StyledList } from "./styles";
import { reducer, init } from "./reducer";
import { renderBoard } from "./helpers";
import GameBoard from "../Board/index";

const Game = () => {
  const [openList, setOpenList] = React.useState(false);
  const [gameVariant, setGameVariant] = React.useState("beginner");
  const [gameState, setGameState] = React.useState("progress");

  const initialState = renderBoard(gameVariant);

  const [board, dispatch] = React.useReducer(reducer, initialState, init);

  const toggleListOpening = () => {
    setOpenList(!openList);
  };

  const handleSizeChange = (variant) => {
    setGameVariant(variant);
    dispatch({ type: "reset", variant: variant });
  };

  return (
    <>
      <AppBar>
        <StyledToolbar>
          <Button onClick={toggleListOpening}>Game size</Button>
          {openList && (
            <StyledList onClick={toggleListOpening}>
              <ListItem onClick={() => handleSizeChange("beginner")}>
                Beginner
              </ListItem>
              <ListItem onClick={() => handleSizeChange("intermediate")}>
                Intermediate
              </ListItem>
              <ListItem onClick={() => handleSizeChange("expert")}>
                Expert
              </ListItem>
            </StyledList>
          )}
        </StyledToolbar>
      </AppBar>
      <GameBoard
        board={board}
        dispatch={dispatch}
        size={gameVariant}
        gameState={gameState}
        gameVariant={gameVariant}
      />
    </>
  );
};

export default Game;
