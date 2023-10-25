import React from "react";
import MyRouter from "./router/index.js";
import NavBar from "./components/NavBar.js";

function App() {
  return (
    <div>
      <NavBar></NavBar>

      <MyRouter />
    </div>
  );
}

export default App;
