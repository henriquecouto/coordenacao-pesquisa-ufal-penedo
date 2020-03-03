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
  const [typeOrder, setTypeorder] = useState("title");
  const [order, setOrder] = useState(["title", "period", "leader"]);
  const [nextPage, setNextPage] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);

  const onChange = e => {
    const orders = {
      title: ["title", "period", "leader"],
      period: ["period", "leader", "title"],
      leader: ["leader", "title", "period"]
    };
    setTypeorder(e.target.value);
    setOrder(orders[e.target.value]);
  };

  const next = () => {
    window.scrollTo(0, 0);
    setProjects(nextPage);
    setNextPage([]);
  };

  const previous = () => {
    window.scrollTo(0, 0);
    setProjects(previousPage.reverse());
    setPreviousPage([]);
  };

  useEffect(() => {
    const unsubscribe = loadPibic(
      setProjects,
      limit,
      order[0],
      order[1],
      order[2]
    );
    return () => unsubscribe();
  }, [order]);

  useEffect(() => {
    // Next page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setNextPage,
        limit,
        order[0],
        order[1],
        order[2],
        projects[projects.length - 1][order[0]],
        projects[projects.length - 1][order[1]],
        projects[projects.length - 1][order[2]]
      );
      return () => unsubscribe();
    }
  }, [projects, order]);

  useEffect(() => {
    // Previous page exists?
    if (projects.length === limit) {
      const unsubscribe = loadPibic(
        setPreviousPage,
        limit,
        order[0],
        order[1],
        order[2],
        projects[0][order[0]],
        projects[0][order[1]],
        projects[0][order[2]],
        true,
        "desc"
      );
      return () => unsubscribe();
    }
  }, [projects, order]);

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
            <Select id="type-order" value={typeOrder} onChange={onChange}>
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
