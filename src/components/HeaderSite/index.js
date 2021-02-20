import React, { useState } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Hidden,
  SwipeableDrawer,
  ListItemIcon,
  Button,
  Link as MuiLink
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LocalLibrary, Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    height: 60,
    objectFit: "contain",
    margin: theme.spacing(1, 2)
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(6)
    }
  },
  toolbar: theme.mixins.toolbar,
  title: {
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  titleText: {
    textDecoration: "none"
  }
}));

export default function Header({ children, position, routes }) {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(v => !v);
  };

  const MenuList = () => (
    <List>
      {Object.keys(routes).map(route => {
        return (
          <ListItem
            button
            key={routes[route].name}
            component={Link}
            to={routes[route].path}
            onClick={toggleDrawer}
            selected={position === routes[route].name}
          >
            <ListItemIcon>{routes[route].icon}</ListItemIcon>
            <ListItemText primary={routes[route].name} />
          </ListItem>
        );
      })}
      <ListItem
        button
        component={MuiLink}
        target='_blank'
        href='https://coord-pesquisa-ufal.web.app/'
        onClick={toggleDrawer}
      >
        <ListItemIcon><LocalLibrary/></ListItemIcon>
        <ListItemText primary='Portal do Pesquisador' />
      </ListItem>
    </List>
  );

  const MenuListHeader = () => (
    <Grid container justify="flex-end">
      {Object.keys(routes)
        .splice(1)
        .map(route => {
          return (
            <Grid item key={routes[route].name}>
              <Button
                component={Link}
                to={routes[route].path}
                color={position === routes[route].name ? "primary" : "default"}
              >
                {routes[route].name}
              </Button>
            </Grid>
          );
        })}
        <Grid item >
          <Button
            component={MuiLink}
            target='_blank'
            href='https://coord-pesquisa-ufal.web.app/'
          >
            Portal do Pesquisador
          </Button>
        </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Hidden lgUp>
                  <Grid item>
                    <IconButton
                      className={classes.menuButton}
                      onClick={toggleDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Hidden>
                <Grid
                  item
                  container
                  alignItems="center"
                  xs
                  className={classes.title}
                >
                  <img
                    src={require("../../assets/brasao-ufal.png")}
                    alt="logo"
                    className={classes.logo}
                  />
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    component={Link}
                    to="/site"
                    className={classes.titleText}
                  >
                    Coordenação de Pesquisa - Unidade Educacional de Penedo
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdDown>
              <Grid item>
                <MenuListHeader />
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <MenuList />
      </SwipeableDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
