import React from "react";
import SideNav from "./containers/SideNav";

import "./App.css";

function App(props) {
  return (
    <React.Fragment>
      <div className="app-title">Employee Mart</div>
      <SideNav />
    </React.Fragment>
  );
}

export default App;
