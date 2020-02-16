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
import { CircularProgress, Grid } from "@material-ui/core";

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();
  const [logged, setLogged] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const handleLogged = res => {
    setLogged(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    listenLogin(handleLogged);
    setPosition("ResearcherArea");
  }, [setPosition]);

  if (loading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

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
