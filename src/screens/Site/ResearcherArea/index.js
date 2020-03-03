import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link,
  Redirect
} from "react-router-dom";
import { listenLogin } from "../../../services/auth";
import { Grid, CircularProgress } from "@material-ui/core";
import ForgotPass from "../../ForgotPass";
import Questionary from "./Questionary";
import SignIn from "../../SignIn";
import SignUp from "../SignUp";
import Home from "./Home";
import Profile from "./Profile";
import ShortBio from "./ShortBio";
import CustomAlert from "../../../components/CustomAlert";

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
          <SignUp/>
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
        <Route exact path={`${match.url}/register`}>
          <Redirect to={`${match.url}/`} />
        </Route>
        <Route exact path={`${match.url}/`}>
          <Home />
        </Route>
        <Route exact path={`${match.url}/questionary/:questionaryId`}>
          <Questionary />
        </Route>
        <Route exact path={`${match.url}/meu-perfil`}>
          <Profile />
        </Route>
        <Route exact path={`${match.url}/short-bio`}>
          <ShortBio />
        </Route>
      </>
    );
  }
}
