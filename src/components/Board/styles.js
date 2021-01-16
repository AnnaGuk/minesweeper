import styled from "styled-components";
import { Window, Button } from "react95";

export const BoardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  justify-content: center;
`;

export const StyledWindow = styled(Window)`
  width: ${({ size }) =>
    size === "beginner"
      ? "300px"
      : size === "intermediate"
      ? "560px"
      : "650px"};
  position: absolute;
  top: ${({ size }) => (size === "expert" ? "53%" : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonIcon = styled.img`
  height: 22px;
  width: 22px;
`;

export const SmallButton = styled(Button)`
  width: ${({ size }) => (size === "expert" ? "25px" : "32px")};
  height: ${({ size }) => (size === "expert" ? "25px" : "32px")};
  background-color: ${({ affected }) => (affected ? "red" : "lightgrey")};

  &:after {
    content: none;
  }
`;
