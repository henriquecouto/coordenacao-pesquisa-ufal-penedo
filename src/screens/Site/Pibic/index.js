import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadPibic } from "../../../services/db";
import CustomCard from "../../../components/CustomCard";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

const limit = 5;
export default function Pibic({ setPosition }) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [nextPage, setNextPage] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);

  const next = () => {
    // setPreviousPage([projects[0]]);
    // loadPibic(setProjects, limit, projects[projects.length - 1].title);
    window.scrollTo(0, 0);
    setProjects(nextPage);
    setNextPage([]);
  };

  const previous = () => {
    // loadPibic(setProjects, limit, previousPage[0].title, false);
    window.scrollTo(0, 0);
    setProjects(previousPage.reverse());
    setPreviousPage([]);
  };

  useEffect(() => {
    const unsubscribe = loadPibic(setProjects, limit);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Next page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setNextPage,
        limit,
        projects[projects.length - 1].title
      );
      return () => unsubscribe();
    }
  }, [projects]);

  useEffect(() => {
    // Previous page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setPreviousPage,
        limit,
        projects[0].title,
        true,
        "desc"
      );
      return () => unsubscribe();
    }
  }, [projects]);

  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);

  console.log({ previousPage, nextPage });

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Typography variant="h4">Projetos PIBIC</Typography>
          <Typography variant="subtitle1">
            Aqui está a lista de Projetos PIBIC da Unidade!
          </Typography>
        </CustomCard>
      </Grid>
      <Grid container className={classes.root} justify="center">
        {projects.map(project => {
          return (
            <CustomCard variant="dark" key={project.id}>
              <Typography variant="h5">{project.title}</Typography>
              <Grid item>
                <Typography variant="body1">
                  Orientador(a): {project.leader}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Ciclo: {project.period}
                </Typography>
              </Grid>
            </CustomCard>
          );
        })}
        <Grid container justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={previousPage.length === 0}
              onClick={previous}
            >
              Voltar
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={nextPage.length === 0}
              onClick={next}
            >
              Avançar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
