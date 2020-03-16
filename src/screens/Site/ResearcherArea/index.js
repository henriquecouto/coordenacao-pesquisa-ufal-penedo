import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link,
  Redirect
} from "react-router-dom";
import { listenLogin, signOut } from "../../../services/auth";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import ForgotPass from "../../ForgotPass";
import Questionary from "./Questionary";
import SignIn from "../../SignIn";
import SignUp from "../SignUp";
import Home from "./Home";
import Profile from "./Profile";
import ShortBio from "./ShortBio";
import { getLastUse, saveLastUse } from "../../../helpers/login";

const { pathname } = window.location;

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();

  const [logged, setLogged] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const handleLogged = res => {
    setLogged(res);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = listenLogin(handleLogged);
    setLoading(true);
    setPosition("ResearcherArea");
    return () => unsubscribe();
  }, [setPosition]);

  useEffect(() => {
    const lastUse = getLastUse();
    const actualUse = new Date();
    if (actualUse - lastUse > 30 * 60000) {
      signOut();
    } else {
      saveLastUse();
    }
  }, []);

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
          <SignUp />
        </Route>
        <Route exact path={`${match.url}/forgot-password`}>
          <ForgotPass />
        </Route>
        <Route exact path={`${match.url}`}>
          <SignIn />
        </Route>
        {pathname !== "/site/area-do-pesquisador/register" &&
          pathname !== "/site/area-do-pesquisador/forgot-password" &&
          pathname !== "/site/area-do-pesquisador" && (
            <Route path={`${match.url}/*`} exact>
              <Typography variant="h6">
                Está página não está acessível ou não existe
              </Typography>
              <Link to={`${match.url}`}>Fazer login</Link>
            </Route>
          )}
      </>
    );
  }

  if (logged.status) {
    return (
      <>
        <Route exact path={`${match.url}/register`}>
          <Redirect to={`${match.url}`} />
        </Route>
        <Route exact path={`${match.url}`}>
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
