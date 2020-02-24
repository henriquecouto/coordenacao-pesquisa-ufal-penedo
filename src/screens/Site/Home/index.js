import React, { useEffect, useState } from "react";
import { Grid, Typography, IconButton} from "@material-ui/core";
import { Link } from "@material-ui/icons";
import { loadCoordinationActivities, loadCoordination } from "../../../services/db";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from "@material-ui/core/styles";
import CustomCard from "../../../components/CustomCard"

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2, 2, 2, 2)
  },
  cardList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  divider: {
    marginLeft: "15px"
  },
  bold:{
    fontWeight: 'bold'
  },
  cardCoordination: {
    padding: '15px'
  },
  icon:{
    marginLeft: '5px',
    padding: '0 5px',
  }
}));

export default function Home({ setPosition }) {
  const classes = useStyles();
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

  const ItemList = ({text}) => {
    return(
      <>
      <ListItem alignItems="flex-start">
        <ListItemText
        primary={text} />
      </ListItem>
      <Divider className={classes.divider} variant="inset" component="li" />
    </>
    )
  } 

  const ItemCoord = ({name, lattes, email}) => {
    return(
      <>
      <Grid container direction="column" className={classes.cardCoordination}>
        <Grid container >
          <Typography>{name}</Typography> {" "}
          <IconButton 
            className={classes.icon}
            href={lattes}>
            <Link />
          </IconButton>
        </Grid>
        <Typography>{email}</Typography> 
      </Grid>
    </>
    )
  } 

  useEffect(() => {
    setPosition("Home");
  }, [setPosition]);

  return (
      <>
        <Grid container className={classes.root} justify="center">
          <CustomCard>
            <Typography variant="subtitle1" align="justify">
            A
            <b> Coordenação de Pesquisa da Unidade Educacional de Penedo</b>
            é responsável por articular a pesquisa às atividades de ensino e de extensão; prospectar as possibilidades 
            de parcerias para pesquisa e inovação; fomentar a realização de eventos de pesquisa e 
            fortalecer e acompanhar os grupos de pesquisa certificados pelo CNPQ.
            </Typography>
            <Typography variant="subtitle1" align="justify">
            Além disso, a coordenação de pesquisa integra o comitê assessor da Pró-Reitoria de 
            Pesquisa da UFAL e tem como principiais atribuições locais as seguintes atividades:
            </Typography>
            <List className={classes.cardList}>
              {coordActivities.map(({activity, order}) => <ItemList key={order} text={activity} />)}
            </List>
            <br />
            <Typography className={classes.bold} variant="h5">Coordenação</Typography>
            <Grid>
              {coordination.map(({name, lattes, email}) => <ItemCoord name={name} lattes={lattes} email={email} /> )}
            </Grid>
          </CustomCard>
          
        </Grid>
      </>
  )  
}
