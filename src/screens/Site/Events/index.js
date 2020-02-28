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

export default function Pibic({ setPosition }) {
  const classes = useStyles();

  useEffect(() => {
    setPosition("Events");
  }, [setPosition]);

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Typography variant="h4">Eventos</Typography>
        </CustomCard>
      </Grid>
     {/*  <Grid container className={classes.root} justify="center">
        <CustomCard variant="dark">
            <Typography variant="h5"></Typography>
        </CustomCard>
        </Grid> */}
    </>
  );
}
