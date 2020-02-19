import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ForgotPass from "../ForgotPass";
import { listenLogin, signOut } from "../../services/auth";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { loadQuestionaries } from "../../services/db";
import Questionary from "./Questionary";

const useStyles = makeStyles(theme => ({
  div: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    maxWidth: 900,
    padding: theme.spacing(0, 2, 2, 2)
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  paperContent: {
    padding: theme.spacing(4)
  },
  logout: {
    margin: theme.spacing(2)
  },
  paperQuestionary: {
    cursor: "pointer",
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper
  }
}));

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();
  const classes = useStyles();

  const [logged, setLogged] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const [questionaries, setQuestionaries] = useState([]);

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
    const unsubscribe = loadQuestionaries(setQuestionaries);
    return () => unsubscribe();
  }, [loading]);

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
          <SignUp setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/`}>
          <SignIn setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/forgot-password`}>
          <ForgotPass setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/questionary/:questionaryId`}>
          <Questionary />
        </Route>
      </Router>
    );
  }

  if (logged.status) {
    return (
      <Router>
        <Route exact path={`${match.url}/`}>
          <div className={classes.div}>
            <Grid container className={classes.root} justify="center">
              <Paper className={classes.paper}>
                <Grid container justify="space-between">
                  <Grid item className={classes.paperContent}>
                    <Typography variant="h4">Área do Pesquisador</Typography>
                    <Typography variant="subtitle1">
                      Aqui você pode adicionar ou editar seus dados acadêmicos
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.logout}
                      color="primary"
                      onClick={signOut}
                    >
                      Sair
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid container className={classes.root}>
              {questionaries.map(v => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={v.id}
                    component={Link}
                    to={`${match.url}/questionary/${v.id}`}
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    <Paper className={classes.paperQuestionary}>
                      <div className={classes.paperContent}>
                        <Typography variant="h4">{v.name}</Typography>
                        <Typography variant="subtitle1">{v.desc}</Typography>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Route>
        <Route exact path={`${match.url}/questionary/:questionaryId`}>
          <Questionary />
        </Route>
      </Router>
    );
  }
}
