import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { recoverPass, listenLogin } from "../../services/auth";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
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

export default function ForgotPass() {
  const history = useHistory();
  const classes = useStyles();

  const [form, setForm] = useState({ email: "" });
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
    const result = await recoverPass(form.email);
    if (result.status) {
      console.log("recuperação");
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
          Recupere sua senha do Gitfy
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
          {error.status && (
            <Typography
              variant="subtitle2"
              color="error"
              style={{ width: "100%" }}
            >
              Erro: {error.message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={make}
          >
            Recuperar
          </Button>
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Link
              variant="body2"
              onClick={history.goBack}
              style={{ cursor: "pointer" }}
            >
              Já sabe sua senha? Faça login!
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
