import React from "react";
import {
  StyledPanel,
  StyledCounter,
  SmileyButton,
  StyledButton,
} from "./styles";
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
      <StyledButton
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
      </StyledButton>
      <StyledCounter value={flagsNumber} size="sm" />
    </StyledPanel>
  );
};

export default CountersPanel;
