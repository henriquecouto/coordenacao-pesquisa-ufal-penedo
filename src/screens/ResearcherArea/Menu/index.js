import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function Menu({
  children,
  sections,
  selectSection,
  selectedSection
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedSection || sections[0]}
        onChange={(e, v) => selectSection(v)}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {sections.map(v => {
          return (
            <Tab key={v.id} label={v.name} {...a11yProps(v.id)} value={v} />
          );
        })}
      </Tabs>
      {children}
    </Paper>
  );
}

export const MenuItem = ({ children, value, selected }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`vertical-tabpanel-${value.id}`}
      aria-labelledby={`vertical-tab-${value.id}`}
    >
      {value === selected && <Box p={2}>{children}</Box>}
    </Typography>
  );
};
