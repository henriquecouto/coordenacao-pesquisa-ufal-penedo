import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { listenLogin, signUp, signIn, signOut } from "../../../services/auth";
import { loadQuestionaries } from "../../../services/db";
import { Grid, CircularProgress, Button, Typography } from "@material-ui/core";
import ForgotPass from "../../ForgotPass";
import Questionary from "../../../components/Questionary";
import CustomCard from "../../../components/CustomCard";

const useStyles = makeStyles(theme => ({
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
    marginTop: theme.spacing(2)
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
          <signUp setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/`}>
          <signIn setLoading={setLoading} />
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
          <Grid container className={classes.root} justify="center">
            <CustomCard
              button={
                <Button
                  className={classes.logout}
                  color="primary"
                  onClick={signOut}
                >
                  Sair
                </Button>
              }
            >
              <Typography variant="h4">Área do Pesquisador</Typography>
              <Typography variant="subtitle1">
                Aqui você pode adicionar ou editar seus dados acadêmicos
              </Typography>
            </CustomCard>
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
                  <CustomCard
                    variant="dark"
                    className={classes.paperQuestionary}
                  >
                    <Typography variant="h4">{v.name}</Typography>
                    <Typography variant="subtitle1">{v.desc}</Typography>
                  </CustomCard>
                </Grid>
              );
            })}
          </Grid>
        </Route>
        <Route exact path={`${match.url}/questionary/:questionaryId`}>
          <Questionary />
        </Route>
      </Router>
    );
  }
}
