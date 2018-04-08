import React from "react";
import logo from "./images/logo.png";

function AppHeader() {
  return (
    <header className="App-header">
      <img src={logo} alt="Walkie Walkie" className="App-header-logo" />
    </header>
  );
}

export default AppHeader;