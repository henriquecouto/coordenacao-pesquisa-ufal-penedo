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
  Link
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
  const history = useHistory();

  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    username: ""
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
          Faça seu cadastro no Gitfy
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
            id="username"
            label="Nome de usuário"
            name="username"
            autoComplete="username"
            onChange={onChange}
            value={form.username}
          />
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
