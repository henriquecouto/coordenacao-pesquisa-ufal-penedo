import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import MaskedInput from "react-text-mask";

import CustomModal from "../../../components/CustomModal";

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[1-9]/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

export default function ModalAdd({ state, handle, add }) {
  const [form, setForm] = useState({
    title: "",
    leader: "",
    period: ""
  });

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const save = async () => {
    await add(form);
  };

  return (
    <CustomModal
      title="Adicionar Projeto"
      open={state}
      handleClose={handle}
      actions={[
        () => {
          return (
            <div>
              <Button onClick={handle}>Cancelar</Button>
              <Button variant="contained" onClick={save} color="primary">
                Adicionar
              </Button>
            </div>
          );
        }
      ]}
    >
      <TextField
        id="title"
        label="Título"
        autoFocus
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={form.name}
      />
      <TextField
        id="leader"
        label="Orientador(a)"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={onChange}
        value={form.desc}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="period">react-text-mask</InputLabel>
        <Input
          value={form.period}
          onChange={onChange}
          id="period"
          inputComponent={TextMaskCustom}
        />
      </FormControl>
    </CustomModal>
  );
}
