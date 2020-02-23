import React, { useEffect, useState } from "react";
import { Grid, Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ModalAdd from "./ModalAdd";
import { addData } from "../../../services/db";

const CustomAlert = ({ open, handle, severity, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handle}>
      <Alert
        onClose={handle}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default function Pibic({ setPosition }) {
  const [modal, setModal] = useState(false);
  const [result, setResult] = useState("");
  useEffect(() => {
    setPosition("Pibic");
  }, [setPosition]);

  const handleModal = () => {
    setModal(old => !old);
  };

  const clearResult = () => {
    setResult("");
  };

  const addProject = async (data, callback) => {
    const result = await addData("pibic", data);
    if (result.status) {
      callback();
      handleModal();
      setResult("success");
    } else {
      setResult("error");
    }
  };

  return (
    <>
      <ModalAdd state={modal} handle={handleModal} add={addProject} />
      <CustomAlert
        open={result === "success"}
        handle={clearResult}
        severity="success"
        message="Projeto cadastrado com sucesso!"
      />
      <CustomAlert
        open={result === "error"}
        handle={clearResult}
        severity="error"
        message="Ocorreu um erro, tente novamente!"
      />
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
