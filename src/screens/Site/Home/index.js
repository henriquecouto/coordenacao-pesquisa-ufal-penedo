import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Home({ setPosition }) {
  useEffect(() => {
    setPosition("Home");
  }, [setPosition]);
  return <Typography>Início</Typography>;
}
