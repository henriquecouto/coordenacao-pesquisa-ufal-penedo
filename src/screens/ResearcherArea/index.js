import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch
} from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ForgotPass from "../ForgotPass";
import { listenLogin } from "../../services/auth";

export default function ResearcherArea({ setPosition }) {
  const [logged, setLogged] = useState({ status: false });
  const match = useRouteMatch();

  useEffect(() => {
    listenLogin(setLogged);
    setPosition("ResearcherArea");
  }, [setPosition]);

  if (!logged.status) {
    return (
      <Router>
        <Route exact path={`${match.url}/register`}>
          <SignUp />
        </Route>
        <Route exact path={`${match.url}/`}>
          <SignIn />
        </Route>
        <Route exact path={`${match.url}/forgot-password`}>
          <ForgotPass />
        </Route>
      </Router>
    );
  }
  return <h1>Fora</h1>;
}
