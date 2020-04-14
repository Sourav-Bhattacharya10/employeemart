import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Employees from "./Employees";
import Projects from "./Projects";

const SideNav = () => {
  return (
    <React.Fragment>
      <h3>Side Nav</h3>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <div>
          <h3>Component Container</h3>
          <Switch>
            <Route exact path="/employees">
              <Employees />
              {/* <h2>Wox</h2> */}
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default SideNav;
