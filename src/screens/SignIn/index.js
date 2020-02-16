import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { signIn } from "../../services/auth";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link
} from "@material-ui/core";

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

export default function SignIn() {
  const match = useRouteMatch();

  const classes = useStyles();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({ status: false, message: "" });

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const make = async e => {
    e.preventDefault();
    const result = await signIn(form.email, form.password);
    if (result.status) {
      console.log("entrou");
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
          Entrar no Gitfy
        </Typography>
        <form onSubmit={make} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            value={form.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
            // onClick={make}
          >
            Entrar
          </Button>
        </form>

        <Grid container>
          <Grid item xs>
            <Link
              variant="body2"
              component={RouterLink}
              to={`${match.url}/forgot-password`}
            >
              Esqueceu a senha?
            </Link>
          </Grid>
          <Grid item>
            <Link
              variant="body2"
              component={RouterLink}
              to={`${match.url}/register`}
            >
              Não possui uma conta? Cadastre-se
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
