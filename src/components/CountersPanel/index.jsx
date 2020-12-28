import React from "react";
import { Button } from "react95";
import { StyledPanel, StyledCounter, SmileyButton } from "./styles";
import smileyFace from "../../assets/smileyface.svg";
import glassesFace from "../../assets/glassesface.svg";
import cryFace from "../../assets/cryface.svg";

const CountersPanel = ({
  gameState,
  minesNumber,
  flagsNumber,
  dispatch,
  gameVariant,
}) => {
  return (
    <StyledPanel variant="well">
      <StyledCounter value={minesNumber} size="sm" />
      <Button
        square
        onClick={() => dispatch({ type: "reset", variant: gameVariant })}
      >
        <SmileyButton
          src={
            gameState === "won"
              ? glassesFace
              : gameState === "lost"
              ? cryFace
              : smileyFace
          }
          alt={gameState === "won" ? ";)" : gameState === "lost" ? ":(" : ":)"}
        />
      </Button>
      <StyledCounter value={flagsNumber} size="sm" />
    </StyledPanel>
  );
};

export default CountersPanel;
