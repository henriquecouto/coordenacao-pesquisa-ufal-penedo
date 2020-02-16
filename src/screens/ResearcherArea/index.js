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
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import { loadSections, loadSubsections } from "../../services/db";

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();
  const [logged, setLogged] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(undefined);

  const [subsections, setSubsections] = useState([]);
  const [selectedSubsection, setSelectedSubsection] = useState(undefined);

  const handleLogged = res => {
    setLogged(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    listenLogin(handleLogged);
    setPosition("ResearcherArea");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadSections(res => {
      setSelectedSection(res[0]);
      setSections(res);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      const unsubscribe = loadSubsections(setSubsections, selectedSection.id);
      return () => unsubscribe();
    }
  }, [selectedSection]);

  if (loading || !sections.length) {
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

  console.log(subsections);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item style={{ marginBottom: 20 }}>
        <Typography variant="h4">Área do Pesquisador</Typography>
      </Grid>
      <Grid container></Grid>
    </Grid>
  );
}
