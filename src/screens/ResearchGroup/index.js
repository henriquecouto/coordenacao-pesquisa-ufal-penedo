import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function ResearchGroups({ setPosition }) {
  useEffect(() => {
    setPosition("ResearchGroups");
  }, [setPosition]);
  return <Typography>Grupos de Pesquisa</Typography>;
}
