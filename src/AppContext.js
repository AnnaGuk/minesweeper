import React from "react";
import { reducer, init } from "./reducer";

const GameContext = React.createContext([{}, () => {}]);

const GameProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, "beginner", init);
  return (
    <GameContext.Provider value={[state, dispatch]}>
      {props.children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
