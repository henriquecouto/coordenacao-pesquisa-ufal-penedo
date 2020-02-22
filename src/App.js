import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Site from "./screens/Site";
import Admin from "./screens/Admin";

const routes = {
  Home: {
    render: <Redirect from="/" exact to="/site" />,
    path: "/"
  },
  Site: {
    render: <Site />,
    path: "/site",
    notExact: true
  },
  Admin: {
    render: <Admin />,
    path: "/admin",
    notExact: true
  }
};

function App() {
  return (
    <Router basename="/">
      {Object.keys(routes).map(route => {
        return (
          <Route
            exact={!routes[route].notExact}
            path={routes[route].path}
            key={routes[route].path}
          >
            {routes[route].render}
          </Route>
        );
      })}
    </Router>
  );
}

export default App;
