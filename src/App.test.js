import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

test("renders a game board", () => {
  render(<App />);
  const Title = screen.getByText("Bugsweeper");
  expect(Title).toBeInTheDocument();
});

test("switches board sizes", () => {
  const game = render(<App />);
  const modeButton = screen.getByText("Game size");

  expect(game.container.querySelectorAll("#board > button")).toHaveLength(64);

  fireEvent.click(modeButton);
  fireEvent.click(screen.getByText("Intermediate"));
  expect(game.container.querySelectorAll("#board > button")).toHaveLength(256);

  fireEvent.click(modeButton);
  fireEvent.click(screen.getByText("Expert"));
  expect(game.container.querySelectorAll("#board > button")).toHaveLength(576);
});
