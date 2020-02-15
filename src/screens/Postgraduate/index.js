import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Postgraduate({ setPosition }) {
  useEffect(() => {
    setPosition("Postgraduate");
  }, [setPosition]);
  return <Typography>Pós Graduação</Typography>;
}
