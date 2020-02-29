import React, { useState, useEffect } from "react";
import {
  loadSections,
  loadSubsections,
  loadQuestions,
  addData,
  loadResponses,
  updateData
} from "../../../../services/db";
import {
  Grid,
  CircularProgress,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { getLoggedUser } from "../../../../services/auth";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(0, 2, 2, 2)
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  paperHeader: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    padding: theme.spacing(2)
  },
  paperContent: {
    padding: theme.spacing(2)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

let alreadyExists = false;

export default function Questionary() {
  const classes = useStyles();
  const { questionaryId } = useParams();
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const bull = <span className={classes.bullet}>•</span>;

  const arrayToObject = (array = []) => {
    let object = {};
    array.forEach(v => {
      object = { ...object, ...v };
    });
    return object;
  };

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const onChangeSelect = id => ({ target: { value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  useEffect(() => {
    if (getLoggedUser()) {
      const unsubscribe = loadResponses(response => {
        if (response[0]) {
          alreadyExists = response[0].id;
          const { data } = response[0];
          console.log({ data });
          if (data && !!Object.entries(data).length) {
            setForm(data);
          }
        } else {
          setForm(arrayToObject(questions.map(v => ({ [v.id]: "0" }))));
        }
      }, questionaryId);
      return () => unsubscribe();
    }
  }, [questionaryId, questions]);

  useEffect(() => {
    const unsubscribe = loadSections(setSections, questionaryId);
    return () => unsubscribe();
  }, [questionaryId]);

  useEffect(() => {
    const unsubscribe = loadSubsections(setSubsections, questionaryId);
    return () => unsubscribe();
  }, [questionaryId]);

  useEffect(() => {
    const unsubscribe = loadQuestions(res => {
      setQuestions(res);
    }, questionaryId);
    return () => unsubscribe();
  }, [questionaryId]);

  const make = async e => {
    e.preventDefault();
    setLoading(true);
    let result;
    if (alreadyExists) {
      result = await updateData("responses", alreadyExists, { data: form });
    } else {
      result = await addData("responses", { data: form, questionaryId });
    }
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

  console.log(Object.keys(form).length);

  return (
    <Grid container justify="center" alignItems="center">
      <form style={{ width: "100%" }} onSubmit={make} className={classes.root}>
        {sections.map(section => {
          return subsections.map(subsection => {
            return (
              subsection.section === section.id &&
              questions.map(question => {
                return (
                  Object.keys(form).length > 0 &&
                  question.subsection === subsection.id && (
                    <Paper
                      className={classes.paper}
                      style={{ marginTop: question.priority !== "1" && 5 }}
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
                          <Grid container direction="column" spacing={0}>
                            <Grid item>
                              <Typography>{question.name}</Typography>
                            </Grid>
                            <Grid item>
                              {question.type !== "select" && (
                                <TextField
                                  type={question.type}
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
                              )}
                              {question.type === "select" && (
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <Select
                                    id={question.id}
                                    value={form[question.id]}
                                    onChange={onChangeSelect(question.id)}
                                  >
                                    {question.options.map(option => {
                                      return (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </Select>
                                </FormControl>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  )
                );
              })
            );
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
  );
}
