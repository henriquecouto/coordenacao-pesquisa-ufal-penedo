import React, { useState, useEffect } from "react";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { signUp, listenLogin } from "../../services/auth";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { Link as Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const history = useHistory();

  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    siape: "",
    knowledgearea: "",
    lattes: "",
    specialization: ""
  });
  const [error, setError] = useState({ status: false, message: "" });
  const [redirect, setRedirect] = useState({ status: false });

  useEffect(() => {
    const unsubscribe = listenLogin(setRedirect);
    return () => unsubscribe();
  }, []);

  if (redirect.status) {
    return <Redirect to="/" />;
  }

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const onChangeSelect = ({ target: { name, value } }) => {
    setForm(old => ({ ...old, [name]: value }));
  };
  const make = async e => {
    e.preventDefault();
    const result = await signUp(form);
    if (result.status) {
      setRedirect({ status: true });
    } else {
      setError({ status: true, message: result.error });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} variant="rounded">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Faça seu cadastro
        </Typography>
        <form onSubmit={make} className={classes.form}>
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            id="fullName"
            label="Nome Completo"
            name="name"
            autoComplete="name"
            onChange={onChange}
            value={form.fullName}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            id="knowledgearea"
            label="Área de Conhecimento"
            onChange={onChange}
            value={form.knowledgearea}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            id="siape"
            label="Siape"
            type="tel"
            onChange={onChange}
            value={form.siape}
          />
          <TextField
            variant="outlined"
            required
            autoComplete="none"
            fullWidth
            margin="normal"
            id="lattes"
            label="Link do Lattes"
            onChange={onChange}
            value={form.lattes}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            style={{ width: "100%", marginTop: 15, marginBottom: 10 }}
          >
            <InputLabel ref={inputLabel} id="input-specialization">
              Titulação
            </InputLabel>
            <Select
              labelWidth={labelWidth}
              labelId="input-specialization"
              name="specialization"
              value={form.specialization}
              onChange={onChangeSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Doutor (a)"}>Doutor (a)</MenuItem>
              <MenuItem value={"Mestre (a)"}>Mestre (a)</MenuItem>
              <MenuItem value={"Especialista"}>Especialista</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={onChange}
            value={form.email}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            margin="normal"
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            value={form.password}
          />
          {error.status && (
            <Typography variant="subtitle2" color="error">
              Erro: {error.message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cadastrar
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              variant="body2"
              onClick={history.goBack}
              style={{ cursor: "pointer" }}
            >
              Já possui uma conta?
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
