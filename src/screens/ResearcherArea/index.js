import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function ResearcherArea({ setPosition }) {
  useEffect(() => {
    setPosition("ResearcherArea");
  }, [setPosition]);
  return <Typography>Área do Pesquisador</Typography>;
}
