import React from "react";
import "./App.css";

import CrystalBall from "./components/crystal_ball/CrystalBall";

const App: React.FC = () => {
  return (
    <div className="App" id="app-root">
      <CrystalBall />
    </div>
  );
};

export default App;
