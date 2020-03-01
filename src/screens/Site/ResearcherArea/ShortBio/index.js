import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Delete as RemoveIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { updateData, addData, loadShortBio } from "../../../../services/db";
import CustomAlert from "../../../../components/CustomAlert";

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

export default function ShortBio() {
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [form, setForm] = useState({
    researchGate: "",
    orcid: "",
    resume: "",
    publications: [""]
  });

  useEffect(() => {
    const unsubscribe = loadShortBio(res => setForm(res.data));
    return () => unsubscribe();
  }, []);

  const onChange = ({ target: { id, value } }) => {
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

  const clearResult = () => setResult("");

  const save = async e => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (alreadyExists) {
      result = await updateData("short-bio", alreadyExists, { data: form });
    } else {
      result = await addData("short-bio", { data: form });
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
          onSubmit={save}
          className={classes.root}
        >
          <Paper className={classes.paper} style={{ marginTop: 5 }}>
            <Grid container direction="column">
              <Grid item className={classes.paperHeader}>
                <Typography variant="h6">ShortBio</Typography>
              </Grid>
              <Grid item className={classes.paperContent}>
                <Grid container direction="column" spacing={0}>
                  <Grid item>
                    <Typography>Link do Research Gate</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="url"
                      variant="outlined"
                      size="small"
                      margin="dense"
                      id={"researchGate"}
                      value={form.researchGate}
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} style={{ marginTop: 5 }}>
            <Grid container direction="column">
              <Grid item className={classes.paperContent}>
                <Grid container direction="column" spacing={0}>
                  <Grid item>
                    <Typography>ID do Orcid</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      margin="dense"
                      id={"orcid"}
                      value={form.orcid}
                      onChange={onChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} style={{ marginTop: 5 }}>
            <Grid container direction="column">
              <Grid item className={classes.paperContent}>
                <Grid container direction="column" spacing={0}>
                  <Grid item>
                    <Typography>Resumo</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      multiline
                      rowsMax={6}
                      rows={4}
                      type="text"
                      variant="outlined"
                      size="small"
                      margin="dense"
                      id="resume"
                      value={form.resume}
                      onChange={onChange}
                      style={{ width: "100%", minWidth: 246 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper className={classes.paper} style={{ marginTop: 5 }}>
            <Grid container direction="column">
              <Grid item className={classes.paperContent}>
                <Grid container direction="column" spacing={0}>
                  <Grid item>
                    <Typography>Publicações Recentes</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column">
                      {form.publications.map((v, i) => {
                        return (
                          <Grid item key={i}>
                            <FormControl
                              variant="outlined"
                              size="small"
                              margin="dense"
                              style={{
                                width: "100%",
                                maxWidth: 550,
                                minWidth: 246
                              }}
                            >
                              <OutlinedInput
                                multiline
                                rowsMax={4}
                                rows={1}
                                type="text"
                                id={"publications"}
                                value={v}
                                onChange={({ target: { id, value } }) =>
                                  onChangeArray("value", i, id, value)
                                }
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      color="secondary"
                                      onClick={() =>
                                        onChangeArray(
                                          "delete",
                                          i,
                                          "publications",
                                          null
                                        )
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
                          onClick={() =>
                            onChangeArray("new", null, "publications", null)
                          }
                        >
                          Adicionar publicação
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
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
