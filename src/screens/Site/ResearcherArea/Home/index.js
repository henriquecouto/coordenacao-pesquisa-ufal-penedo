import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CustomCard from "../../../../components/CustomCard";
import { signOut, getLoggedUser } from "../../../../services/auth";
import { useRouteMatch, Link } from "react-router-dom";
import { loadQuestionaries } from "../../../../services/db";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  paperContent: {
    padding: theme.spacing(4)
  },

  paperQuestionary: {
    cursor: "pointer",
    width: "100%",
    marginTop: theme.spacing(2)
  }
}));

export default function Home() {
  const match = useRouteMatch();
  const classes = useStyles();
  const [questionaries, setQuestionaries] = useState([]);

  useEffect(() => {
    const unsubscribe = loadQuestionaries(res => {
      setQuestionaries(res);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard
          button={
            <Grid container spacing={2} className={classes.paperContent}>
              <Button
                className={classes.button}
                component={Link}
                to={match.url + "/meu-perfil"}
                variant="contained"
                color="primary"
              >
                Perfil
              </Button>
              <Button
                className={classes.button}
                color="primary"
                onClick={signOut}
              >
                Sair
              </Button>
            </Grid>
          }
        >
          <Typography variant="h4">
            Olá, {getLoggedUser().displayName}, seja bem vindo(a)!
          </Typography>
          <Typography variant="subtitle1">
            Aqui você pode adicionar ou editar seus dados acadêmicos
          </Typography>
        </CustomCard>
      </Grid>

      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          component={Link}
          to={`${match.url}/short-bio`}
          style={{
            textDecoration: "none"
          }}
        >
          <CustomCard variant="dark" className={classes.paperQuestionary}>
            <Typography variant="h4">Biografia do Pesquisador</Typography>
            <Typography variant="subtitle1">
              Forneça informações sobre a sua carreira e interesses de pesquisa
            </Typography>
          </CustomCard>
        </Grid>
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
              <CustomCard variant="dark" className={classes.paperQuestionary}>
                <Typography variant="h4">{v.name}</Typography>
                <Typography variant="subtitle1">{v.desc}</Typography>
              </CustomCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
