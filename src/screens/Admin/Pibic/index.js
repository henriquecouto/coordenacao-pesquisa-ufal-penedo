import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import ModalAdd from "./ModalAdd";

export default function Pibic({ setPosition }) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);

  const handleModal = () => {
    setModal(old => !old);
  };

  return (
    <>
      <ModalAdd state={modal} handle={handleModal} add={() => {}} />
      <Grid container>
        <Grid container>
          <Button variant="contained" color="primary" onClick={handleModal}>
            Adicionar Projeto
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
