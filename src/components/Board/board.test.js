import { render, cleanup } from "@testing-library/react";
import GameBoard from "./index.jsx";
import { GameProvider } from "../../context/AppContext";

const renderWithContext = (component) => {
  return {
    ...render(<GameProvider>{component}</GameProvider>),
  };
};

afterEach(cleanup);

test("GameBoard component snapshot testing", () => {
  const board = renderWithContext(<GameBoard />);
  expect(board).toMatchSnapshot();
});
