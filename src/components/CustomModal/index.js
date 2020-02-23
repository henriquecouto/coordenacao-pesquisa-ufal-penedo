import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from "@material-ui/core";

export default function CustomModal({
  handleClose,
  open,
  children,
  title,
  actions
}) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Grid
          container
          justify={actions.length > 1 ? "space-between" : "flex-end"}
        >
          {actions.map((Component, i) => {
            return <Component key={i} />;
          })}
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
