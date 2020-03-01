import React, { useState, useEffect } from "react";
import {
  loadSections,
  loadSubsections,
  loadQuestions,
  addData,
  loadResponses,
  updateData,
  loadQuestionary,
  loadLoggedUser
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
  MenuItem,
  IconButton,
  InputAdornment,
  Input,
  OutlinedInput
} from "@material-ui/core";

import CustomAlert from "../../../../components/CustomAlert";

import { Delete as RemoveIcon, Print } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();
  const classes = useStyles();
  const { questionaryId } = useParams();
  const [questionary, setQuestionary] = useState([]);
  const [sections, setSections] = useState([]);
  const [subsections, setSubsections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

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

  const onChangeArray = (change, index, id, value) => {
    const newForm = form;

    const changes = {
      value: () => {
        newForm[id][index] = value;
        setForm({ ...newForm });
      },
      new: () => {
        newForm[id].push("");
        setForm({ ...newForm });
      },
      delete: () => {
        newForm[id].splice(index, 1);
        setForm({ ...newForm });
      }
    };

    changes[change](index);
  };

  useEffect(() => {
    if (getLoggedUser()) {
      const unsubscribe = loadResponses(response => {
        if (response[0]) {
          alreadyExists = response[0].id;
          const { data } = response[0];
          if (data && !!Object.entries(data).length) {
            setForm(data);
          }
        } else {
          setForm(
            arrayToObject(
              questions.map(v => {
                if (v.type === "array") {
                  return { [v.id]: [""] };
                }
                return { [v.id]: v.type === "number" ? "0" : "" };
              })
            )
          );
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

  useEffect(() => {
    const unsubscribe = loadQuestionary(setQuestionary, questionaryId);
    return () => unsubscribe();
  }, [questionaryId]);

  const clearResult = () => setResult("");

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
      setResult("success");
      setLoading(false);
    } else {
      setResult("error");
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

  return (
    <>
      <CustomAlert
        open={result === "success"}
        handle={clearResult}
        severity="success"
        message="Dados salvos com sucesso!"
      />
      <CustomAlert
        open={result === "error"}
        handle={clearResult}
        severity="error"
        message="Ocorreu um erro, tente novamente!"
      />

      <Grid container justify="center" alignItems="center">
        <form
          style={{ width: "100%" }}
          onSubmit={make}
          className={classes.root}
        >
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
                                {
                                  inputs(
                                    question,
                                    form[question.id],
                                    onChange,
                                    onChangeSelect(question.id),
                                    onChangeArray
                                  )[question.type]
                                }
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
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                >
                  Salvar
                </Button>

                <Button
                  color="primary"
                  className={classes.button}
                  onClick={() => history.push("/site/area-do-pesquisador")}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
}

const inputs = (question, value, onChange, onChangeSelect, onChangeArray) => ({
  number: (
    <TextField
      type={question.type}
      variant="outlined"
      size="small"
      margin="dense"
      id={question.id}
      value={value}
      onChange={onChange}
      inputProps={{
        min: 0
      }}
    />
  ),
  select: (
    <FormControl variant="outlined">
      <Select id={question.id} value={value} onChange={onChangeSelect}>
        {question.options &&
          question.options.map(option => {
            return (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  ),
  text: (
    <TextField
      type={question.type}
      variant="outlined"
      size="small"
      margin="dense"
      id={question.id}
      value={value}
      onChange={onChange}
    />
  ),
  textarea: (
    <TextField
      multiline
      rowsMax={6}
      rows={4}
      type={question.type}
      variant="outlined"
      size="small"
      margin="dense"
      id={question.id}
      value={value}
      onChange={onChange}
      style={{ width: "100%", minWidth: 246 }}
    />
  ),
  array: (
    <Grid container direction="column">
      {!!value.map &&
        value.map((v, i) => {
          return (
            <Grid item key={i}>
              <FormControl
                variant="outlined"
                size="small"
                margin="dense"
                style={{ width: "100%", maxWidth: 550, minWidth: 246 }}
              >
                <OutlinedInput
                  multiline
                  rowsMax={4}
                  rows={1}
                  type={question.type}
                  id={question.id}
                  value={v}
                  onChange={({ target: { id, value } }) =>
                    onChangeArray("value", i, id, value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          onChangeArray("delete", i, question.id, null)
                        }
                        edge="end"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          );
        })}
      <Grid item>
        <Button
          color="primary"
          onClick={() => onChangeArray("new", null, question.id, null)}
        >
          Adicionar publicação
        </Button>
      </Grid>
    </Grid>
  )
});
