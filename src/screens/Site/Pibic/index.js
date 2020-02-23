import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useState } from "react";
import { loadPibic } from "../../../services/db";

export default function Pibic({ setPosition }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadPibic(setProjects);
    return () => unsubscribe();
  }, []);

  return <Typography>PIBIC</Typography>;
}
