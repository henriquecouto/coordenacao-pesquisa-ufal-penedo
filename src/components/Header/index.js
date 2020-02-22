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
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu as MenuIcon } from "@material-ui/icons";
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
    alignItems: "center"
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
                <Grid item xs className={classes.title}>
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
        <div className={classes.toolbar} />
        <MenuList />
      </SwipeableDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
