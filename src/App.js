import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
// original Windows95 font
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import { GameProvider } from "./context/AppContext";

import Game from "./components/Game/index";

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

// <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <div>
          <GlobalStyles />
          <ThemeProvider theme={original}>
            <Game />
          </ThemeProvider>
        </div>
      </div>
    </GameProvider>
  );
};

export default App;
