import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  light: {
    width: "100%"
  },
  dark: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
    marginBottom: theme.spacing(2)
  },
  error: {
    width: "100%",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.background.paper
  },
  paperContent: {
    padding: theme.spacing(4)
  }
}));
export default function CustomCard({
  children,
  button,
  className,
  variant = "light"
}) {
  const classes = useStyles();
  return (
    <Paper className={(className, classes[variant])}>
      <Grid container justify="space-between">
        <Grid item className={classes.paperContent}>
          {children}
        </Grid>
        {!!button && <Grid item>{button}</Grid>}
      </Grid>
    </Paper>
  );
}
