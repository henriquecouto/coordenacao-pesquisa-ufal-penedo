import React from "react";
import CustomCard from "../CustomCard";
import { Typography, Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

export default function ErrorMessage({ message, action = () => {}, cursor }) {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <div onClick={action} style={{ cursor }}>
        <CustomCard variant="error">
          <Typography variant="h6">{message}</Typography>
        </CustomCard>
      </div>
    </Grid>
  );
}
