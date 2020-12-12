import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset, AppBar, Toolbar, Button } from "react95";
import original from "react95/dist/themes/original";
// original Windows95 font
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import GameBoard from "./components/GameGrid/index.jsx";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color: teal;
  }
  * {
    box-sizing: border-box;
    width: 100%;
  }
  ${styleReset}
`;

//TO DO: beginner/intermediate/expert
//Beginner (8x8, 10 mines), Intermediate (16x16, 40 mines) and Expert (24x24, 99 mines)

const App = () => {
  return (
    <div className="App">
      <div>
        <GlobalStyles />
        <ThemeProvider theme={original}>
          <AppBar>
            <Toolbar style={{ justifyContent: "space-between" }}>
              <Button>Default</Button>
            </Toolbar>
          </AppBar>
          <GameBoard boardSize={8} />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;
