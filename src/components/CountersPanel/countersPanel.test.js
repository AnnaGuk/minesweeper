import { render, cleanup } from "@testing-library/react";
import CountersPanel from "./index.jsx";
import { GameProvider } from "../../context/AppContext";

const renderWithContext = (component) => {
  return {
    ...render(<GameProvider>{component}</GameProvider>),
  };
};

afterEach(cleanup);

test("CountersPanel component snapshot testing", () => {
  const panel = renderWithContext(<CountersPanel />);
  expect(panel).toMatchSnapshot();
});
