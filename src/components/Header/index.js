import React, { useState } from "react";
import {
  Typography,
  Toolbar,
  IconButton,
  AppBar,
  Grid,
  Drawer,
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
import { Link, Redirect } from "react-router-dom";

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
  appBarGrid: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start"
    }
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
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  title: {
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  },
  titleText: {
    textDecoration: "none",
    fontWeight: 300,
    [theme.breakpoints.down("md")]: { ...theme.typography.h5, fontSize: 35 },
    [theme.breakpoints.down("sm")]: { ...theme.typography.h6 }
  },
  gridTitle: { [theme.breakpoints.up("md")]: { marginTop: 20 } }
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
    <Grid container style={{ margin: "20px 0" }}>
      {Object.keys(routes)
        .splice(1)
        .map(route => {
          return (
            <Grid item key={routes[route].name}>
              <Button
                component={Link}
                to={routes[route].path}
                variant={position === routes[route.name] ? "contained" : "text"}
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
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            className={classes.appBarGrid}
          >
            <Grid item xs>
              <Grid container alignItems="center" className={classes.gridTitle}>
                <Hidden mdUp>
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
                    variant="h3"
                    color="textPrimary"
                    component={Link}
                    to="/"
                    className={classes.titleText}
                  >
                    Coordenação de Pesquisa - Unidade Educacional de Penedo
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Hidden smDown>
              <Grid item xs>
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
