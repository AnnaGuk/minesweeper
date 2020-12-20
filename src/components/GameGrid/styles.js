import styled from "styled-components";
import { Window, Button } from "react95";

export const BoardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: center;
`;

export const StyledWindow = styled(Window)`
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonIcon = styled.img`
  height: 20px;
  width: 20px;
`;

export const SmallButton = styled(Button)`
  width: 32px;
  height: 32px;
`;
