import React from "react";
import { Button } from "react95";
import { StyledPanel, StyledCounter, SmileyButton } from "./styles";
import smileyFace from "../../assets/smileyface.svg";

const CountersPanel = ({ minesNumber, flagsNumber }) => {
  return (
    <StyledPanel variant="well">
      <StyledCounter value={minesNumber} size="sm" />
      <Button square>
        <SmileyButton src={smileyFace} alt=":)" />
      </Button>
      <StyledCounter value={flagsNumber} size="sm" />
    </StyledPanel>
  );
};

export default CountersPanel;
