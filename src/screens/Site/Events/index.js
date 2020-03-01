import React, { useEffect, useState } from "react";
import { Typography, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { loadEvents } from "../../../services/db";
import CustomCard from "../../../components/CustomCard";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  }
}));

export default function Pibic({ setPosition }) {
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setPosition("Events");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadEvents(setEvents);
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Grid container className={classes.root} justify="center">
        <CustomCard>
          <Typography variant="h4">Eventos</Typography>
        </CustomCard>
      </Grid>
       <Grid container className={classes.root} justify="center">
       {events.map(event => {
         return (
          <Link href={event.link} target="_blank" rel="noopener" color="inherit" style={{textDecoration: 'none'}}>
            <CustomCard variant="dark">
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="subtitle1">Descrição: {event.description}</Typography>
            </CustomCard>
          </Link>
         )
       })}
       </Grid>
    </>
  );
}
