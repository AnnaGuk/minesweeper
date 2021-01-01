import React from "react";
import { AppBar, Button, ListItem } from "react95";
import { StyledToolbar, StyledList } from "./styles";

import GameBoard from "../Board/index";
import { GameContext } from "../../AppContext";

const Game = () => {
  const [openList, setOpenList] = React.useState(false);
  const [state, dispatch] = React.useContext(GameContext);

  const toggleListOpening = () => {
    setOpenList(!openList);
  };

  const handleSizeChange = (variant) =>
    dispatch({ type: "reset", variant: variant });

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
      <GameBoard />
    </>
  );
};

export default Game;
