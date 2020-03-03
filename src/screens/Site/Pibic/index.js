import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadPibic } from "../../../services/db";
import CustomCard from "../../../components/CustomCard";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const limit = 5;
export default function Pibic({ setPosition }) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [typeOrder, setTypeorder] = useState("period");
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
    const unsubscribe = loadPibic(
      setProjects,
      limit,
      undefined,
      undefined,
      typeOrder
    );
    return () => unsubscribe();
  }, [typeOrder]);

  useEffect(() => {
    // Next page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setNextPage,
        limit,
        projects[projects.length - 1].title,
        undefined,
        typeOrder
      );
      return () => unsubscribe();
    }
  }, [projects, typeOrder]);

  useEffect(() => {
    // Previous page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setPreviousPage,
        limit,
        projects[0].title,
        true,
        typeOrder
      );
      return () => unsubscribe();
    }
  }, [projects, typeOrder]);

  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Grid container spacing={5}>
            <Grid item>
              <Typography variant="h4">Projetos PIBIC</Typography>
              <Typography variant="subtitle1">
                Aqui está a lista de Projetos PIBIC da Unidade!
              </Typography>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
      <Grid container direction="column" className={classes.root}>
        <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
        <Grid>
          <FormControl className={classes.formControl} variant="outlined">
            <Select
              id="type-order"
              value={typeOrder}
              onChange={e => {
                setTypeorder(e.target.value);
              }}
            >
              <MenuItem value="period">Ciclo</MenuItem>
              <MenuItem value="title">Título</MenuItem>
              <MenuItem value="leader">Orientador</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
