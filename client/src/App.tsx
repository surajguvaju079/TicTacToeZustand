import "./App.css";

import Game from "./components/Game";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Game />
    </div>
  );
}

export default App;
