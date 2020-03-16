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
  Link,
  CircularProgress
} from "@material-ui/core";
import CustomAlert from "../../components/CustomAlert";

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
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const clearResult = () => setError({ status: false });

  const make = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn(form.email, form.password);
    if (!result.status) {
      setError({ status: true, message: result.error });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <CustomAlert
        open={error.status}
        handle={clearResult}
        severity="error"
        message={error.message}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} variant="rounded">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar
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
    </>
  );
}
