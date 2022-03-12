import { render, cleanup } from "@testing-library/react";
import Game from "./index.jsx";
import { GameProvider } from "../../context/AppContext";

const renderWithContext = (component) => {
  return {
    ...render(<GameProvider>{component}</GameProvider>),
  };
};

afterEach(cleanup);

test("Game component snapshot testing", () => {
  const game = renderWithContext(<Game />);
  expect(game).toMatchSnapshot();
});
