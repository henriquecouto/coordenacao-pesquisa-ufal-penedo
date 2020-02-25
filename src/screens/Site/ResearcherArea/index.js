import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { listenLogin, getLoggedUser } from "../../../services/auth";
import { loadQuestionaries } from "../../../services/db";
import { Grid, CircularProgress } from "@material-ui/core";
import ForgotPass from "../../ForgotPass";
import Questionary from "./Questionary";
import SignIn from "../../SignIn";
import SignUp from "../SignUp";
import Home from "./Home";

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
      <>
        <Route exact path={`${match.url}/register`}>
          <SignUp setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/`}>
          <SignIn setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/forgot-password`}>
          <ForgotPass setLoading={setLoading} />
        </Route>
      </>
    );
  }

  if (logged.status) {
    return (
      <>
        <Route exact path={`${match.url}/`}>
          <Home />
        </Route>
        <Route exact path={`${match.url}/questionary/:questionaryId`}>
          <Questionary />
        </Route>
        <Route exact path={`${match.url}/meu-perfil`}>
          <h1> Hello Meu PErfil</h1>
        </Route>
      </>
    );
  }
}
