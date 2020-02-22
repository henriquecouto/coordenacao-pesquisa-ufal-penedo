import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Site from "./screens/Site";
import Admin from "./screens/Admin";

const routes = {
  Site: {
    render: <Site />,
    path: "/"
  },
  Admin: {
    render: <Admin />,
    path: "/admin"
  }
};

function App() {
  return (
    <Router>
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
