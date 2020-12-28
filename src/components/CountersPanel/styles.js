import styled from "styled-components";
import { Panel, Counter, Button } from "react95";

export const StyledPanel = styled(Panel)`
  padding: 7px;
  display: flex;
  justify-content: space-between;
`;

export const StyledCounter = styled(Counter)`
  max-width: 50px;
  padding: 4px;
`;

export const SmileyButton = styled.img`
  width: 20px;
  height: 20px;
`;

export const StyledButton = styled(Button)`
  &:after {
    content: none;
  }
`;
