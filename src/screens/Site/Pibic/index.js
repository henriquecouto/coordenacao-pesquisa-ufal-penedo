import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";

export default function Pibic({ setPosition }) {
  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);
  return <Typography>PIBIC</Typography>;
}
