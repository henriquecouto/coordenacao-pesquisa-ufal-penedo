import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch
} from "react-router-dom";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import ForgotPass from "../ForgotPass";
import { listenLogin, signOut } from "../../services/auth";
import {
  CircularProgress,
  Grid,
  Typography,
  Paper,
  TextField,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  loadSections,
  loadSubsections,
  loadQuestions,
  addData
} from "../../services/db";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(0, 2, 2, 2)
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(4)
  },
  paperHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    padding: theme.spacing(2)
  },
  paperContent: {
    padding: theme.spacing(4)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  button: {
    marginTop: theme.spacing(2)
  },
  logout: {
    margin: theme.spacing(2)
  }
}));

export default function ResearcherArea({ setPosition }) {
  const match = useRouteMatch();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [logged, setLogged] = useState({ status: false });
  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({});
  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const handleLogged = res => {
    setLogged(res);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    listenLogin(handleLogged);
    setPosition("ResearcherArea");
  }, [setPosition]);

  useEffect(() => {
    const unsubscribe = loadSections(setSections);
    return () => unsubscribe();
  }, [loading]);

  useEffect(() => {
    const unsubscribe = loadSubsections(setSubsections);
    return () => unsubscribe();
  }, [loading]);

  useEffect(() => {
    const unsubscribe = loadQuestions(res => {
      setForm(arrayToObject(res.map(v => ({ [v.id]: "0" }))));
      setQuestions(res);
    });
    return () => unsubscribe();
  }, [loading]);

  const arrayToObject = (array = []) => {
    let object = {};
    array.forEach(v => {
      object = { ...object, ...v };
    });
    return object;
  };

  const make = async e => {
    e.preventDefault();
    setLoading(true);
    const result = await addData("responses", { data: form });
    console.log(result);
    if (result.status) {
      setLoading(false);
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  if (loading || !sections.length || !subsections.length || !questions.length) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (!logged.status) {
    return (
      <Router>
        <Route exact path={`${match.url}/register`}>
          <SignUp setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/`}>
          <SignIn setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.url}/forgot-password`}>
          <ForgotPass setLoading={setLoading} />
        </Route>
      </Router>
    );
  }

  if (logged.status) {
    return (
      <Grid container justify="center">
        <Grid container className={classes.root} justify="center">
          <Paper className={classes.paper}>
            <Grid container justify="space-between">
              <Grid item className={classes.paperContent}>
                <Typography variant="h4">Área do Pesquisador</Typography>
                <Typography variant="subtitle1">
                  Aqui você pode adicionar ou editar seus dados acadêmicos
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  className={classes.logout}
                  color="primary"
                  onClick={signOut}
                >
                  Sair
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <form style={{ width: "100%" }} onSubmit={make}>
            {sections.map(section => {
              return subsections.map(subsection => {
                if (subsection.section === section.id) {
                  return questions.map(question => {
                    if (question.subsection === subsection.id) {
                      return (
                        <Paper
                          className={classes.paper}
                          style={{ marginTop: question.priority !== "1" && 10 }}
                          key={question.id}
                        >
                          <Grid container direction="column">
                            {question.priority === "1" && (
                              <Grid item className={classes.paperHeader}>
                                <Typography variant="h6">
                                  {section.name.toUpperCase()}
                                  {subsection.name && bull}
                                  {subsection.name}
                                </Typography>
                              </Grid>
                            )}
                            <Grid item className={classes.paperContent}>
                              <Grid container direction="column" spacing={2}>
                                <Grid item>
                                  <Typography>{question.name}</Typography>
                                </Grid>
                                <Grid item>
                                  <TextField
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    margin="dense"
                                    id={question.id}
                                    value={form[question.id]}
                                    onChange={onChange}
                                    inputProps={{
                                      min: 0
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      );
                    }
                    return "";
                  });
                }
                return "";
              });
            })}

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Salvar
              </Button>
              <Button color="primary" className={classes.button}>
                Cancelar
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
