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
import { GameContext } from "../../context/AppContext";

const CountersPanel = () => {
  const [state, dispatch] = React.useContext(GameContext);
  const { minesNumber, gameVariant, flagsNumber } = state;

  return (
    <StyledPanel variant="well">
      <StyledCounter value={minesNumber} size="sm" />
      <StyledButton
        square
        onClick={() => dispatch({ type: "reset", variant: gameVariant })}
      >
        <SmileyButton
          src={
            state.gameState === "won"
              ? glassesFace
              : state.gameState === "lost"
              ? cryFace
              : smileyFace
          }
          alt={
            state.gameState === "won"
              ? ";)"
              : state.gameState === "lost"
              ? ":("
              : ":)"
          }
        />
      </StyledButton>
      <StyledCounter value={flagsNumber} size="sm" />
    </StyledPanel>
  );
};

export default CountersPanel;
