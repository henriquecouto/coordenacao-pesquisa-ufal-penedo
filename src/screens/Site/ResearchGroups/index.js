import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomCard from "../../../components/CustomCard";
import { loadResearchGroups } from "../../../services/db";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

export default function ResearchGroups({ setPosition }) {
  const classes = useStyles();
  const [researchGroups, setResearchGroups] = useState([]);

  useEffect(() => {
    const unsubscribe = loadResearchGroups(setResearchGroups);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setPosition("ResearchGroups");
  }, [setPosition]);
  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Typography variant="h4">Grupos de Pesquisa</Typography>
          <Typography variant="subtitle1">
              Grupos de Pesquisa da Unidade Certificados pelo CNPQ
          </Typography>
        </CustomCard>
      </Grid>
      <Grid container className={classes.root} justify="center">
        {researchGroups.map(group => {
          return (
            <CustomCard variant="dark" key={group.id}>
              <Typography variant="h5">{group.name}</Typography>
              <Grid item>
                <Typography variant="body1">Líder: {group.leader}</Typography>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">
                    Área: {group.area}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Criado em {group.creationYear}
                  </Typography>
                </Grid>
              </Grid>
            </CustomCard>
          );
        })}
      </Grid>
    </>
  );
}
