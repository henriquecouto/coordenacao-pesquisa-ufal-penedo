import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { recoverPass, listenLogin } from "../../services/auth";
import { Redirect, useHistory } from "react-router-dom";
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

export default function ForgotPass() {
  const history = useHistory();
  const classes = useStyles();

  const [form, setForm] = useState({ email: "" });
  const [result, setResult] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const clearResult = () => setResult({ status: "" });

  const make = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await recoverPass(form.email);
    if (!result.status) {
      setResult({ status: "error", message: result.error });
    } else {
      setResult({ status: "success", message: "Verifique seu email para recuperar sua senha (Lembre de verificar a caixa de spam)" });
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
        open={result.status}
        handle={clearResult}
        severity={result.status}
        message={result.message}
      />
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
    </>
  );
}
