import React, { useEffect, useState } from "react";
import { Typography, Grid, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFile } from "../../../services/storage";
import CustomCard from "../../../components/CustomCard";
import {
  loadCoordinationActivities,
  loadCoordination
} from "../../../services/db";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    minHeight: window.innerHeight - 64
  },
  header: {
    height: window.innerHeight - 400,
    maxWidth: 1000
  },
  item: {
    maxWidth: 1200,
    padding: theme.spacing(2, 2, 2, 2)
  },
  activity: {
    maxWidth: 600
  },
  icon: {
    height: 80,
    width: 80,
    fontSize: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    color: "white",
    borderRadius: 80
  }
}));

export default function Home({ setPosition }) {
  const classes = useStyles();
  const [logo, setLogo] = useState("");
  const [coordActivities, setCoordActivities] = useState([]);
  const [coordination, setCoordination] = useState([]);

  useEffect(() => {
    const unsubscribe = loadCoordinationActivities(setCoordActivities);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = loadCoordination(setCoordination);
    return () => unsubscribe();
  }, []);

  const handleImage = async () => {
    setLogo(await getFile("assets/logo-ufal.png"));
  };

  useEffect(() => {
    handleImage();
  }, []);

  useEffect(() => {
    setPosition("Home");
  }, [setPosition]);
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid
        item
        container
        className={`${classes.item}, ${classes.header}`}
        direction="column"
        justify="center"
      >
        <Typography variant="h2">Coordenação de Pesquisa</Typography>
        <Typography variant="h2">Unidade Educacional de Penedo</Typography>
      </Grid>

      <Grid item container className={classes.item}>
        <CustomCard variant="light">
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="body1">
                A{" "}
                <strong>
                  Coordenação de Pesquisa da Unidade Educacional de Penedo
                </strong>{" "}
                é responsável por articular a pesquisa às atividades de ensino e
                de extensão; prospectar as possibilidades de parcerias para
                pesquisa e inovação; fomentar a realização de eventos de
                pesquisa e fortalecer e acompanhar os grupos de pesquisa
                certificados pelo CNPQ.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Além disso, a coordenação de pesquisa integra o comitê assessor
                da Pró-Reitoria de Pesquisa da UFAL e tem como principais
                atribuições locais as seguintes atividades:
              </Typography>
            </Grid>
            <Grid item container spacing={10} justify="center">
              {coordActivities.map(v => {
                return (
                  <Grid
                    item
                    container
                    direction="row"
                    alignItems="center"
                    className={classes.activity}
                    spacing={2}
                    key={v.id}
                  >
                    <Grid item>
                      <Icon className={classes.icon}>{v.icon}</Icon>
                    </Grid>
                    <Grid item xs>
                      <Typography>{v.name}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
}
