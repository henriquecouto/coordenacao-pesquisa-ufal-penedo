import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch
} from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ForgotPass from "../ForgotPass";

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();

  useEffect(() => {
    setPosition("ResearcherArea");
  }, [setPosition]);

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
