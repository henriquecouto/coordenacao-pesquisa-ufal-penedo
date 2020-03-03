import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadPostgraduate } from "../../../services/db";
import CustomCard from "../../../components/CustomCard";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

export default function Postgraduate({ setPosition }) {

  const classes = useStyles();
  const [postgraduations, setPostgraduations] = useState([]);
  
  useEffect(() => {
    const unsubscribe = loadPostgraduate(setPostgraduations);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPosition("Postgraduate");
  }, [setPosition]);
  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Typography variant="h4">Pós Graduação</Typography>
          <Typography variant="subtitle1">
              Programas de pós Graduação da Unidade
          </Typography>
        </CustomCard>
      </Grid>
      <Grid container className={classes.root} justify="center">
        {postgraduations.map(postgraduate => {
          return (
            <CustomCard variant="dark" key={postgraduate.id}>
              <Typography variant="h5">{postgraduate.title}</Typography>
              <Grid item>
                <Typography variant="body1">Coordenador: {postgraduate.leader}</Typography>
              </Grid>
              <Grid item>
                  <Typography variant="subtitle1">
                    Modalidade do curso: {postgraduate.modality}
                  </Typography>
                </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">
                    Tempo de Realização: {postgraduate.realizationTime}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Carga Horária: {postgraduate.workload}
                  </Typography>
                </Grid>
              </Grid>
            </CustomCard>
          );
        })}
      </Grid>
    </>
  )
}
