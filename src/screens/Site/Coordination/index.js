import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Coordination({ setPosition }) {
  useEffect(() => {
    setPosition("Coordination");
  }, [setPosition]);
  return <Typography>Coordenação</Typography>;
}
