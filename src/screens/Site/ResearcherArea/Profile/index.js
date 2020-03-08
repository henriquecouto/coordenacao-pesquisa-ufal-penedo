import React, { useState, useEffect } from "react";
import { getLoggedUser } from "../../../../services/auth";
import { loadLoggedUser, updateData } from "../../../../services/db";
import {
  Grid,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomCard from "../../../../components/CustomCard";
import CustomAlert from "../../../../components/CustomAlert";
import { saveFile } from "../../../../services/storage";

let doc;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    padding: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(3)
  },
  item: { marginTop: theme.spacing(4) },
  avatar: {
    width: 150,
    height: 150
  }
}));

export default function Profile() {
  const specializationLabel = React.useRef(null);
  const courseLabel = React.useRef(null);
  const [labelsWidth, setLabelsWidth] = React.useState({
    specialization: 0,
    course: 0
  });

  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    siape: "",
    knowledgearea: "",
    lattes: "",
    specialization: "",
    course: "",
    photo: ""
  });
  const [image, setImage] = useState(null);

  React.useEffect(() => {
    if (editing) {
      setLabelsWidth({
        specialization: specializationLabel.current.offsetWidth,
        course: courseLabel.current.offsetWidth
      });
    }
  }, [editing]);

  useEffect(() => {
    const unsubscribe = loadLoggedUser(
      ({
        fullName,
        siape,
        knowledgearea,
        lattes,
        specialization,
        course,
        id,
        photo = ""
      }) => {
        setForm({
          fullName,
          siape,
          knowledgearea,
          lattes,
          specialization,
          course,
          photo
        });
        doc = id;
      }
    );
    return () => unsubscribe();
  }, [editing]);

  const handleEditing = () => {
    setEditing(old => !old);
  };

  const onChange = ({ target: { id, value } }) => {
    setForm(old => ({ ...old, [id]: value }));
  };

  const onChangeSelect = ({ target: { name, value } }) => {
    setForm(old => ({ ...old, [name]: value }));
  };

  const onChangeImage = ({ target: { id, files } }) => {
    setForm(old => ({ ...old, [id]: URL.createObjectURL(files[0]) }));
    setImage(files[0]);
  };

  const clearResult = () => setResult("");

  const save = async e => {
    e.preventDefault();
    setLoading(true);

    const imageUploaded = async imageUrl => {
      const result = await updateData("users", doc, {
        ...form,
        photo: imageUrl
      });
      if (result.status) {
        setResult("success");
        setEditing(false);
      } else {
        setResult("error");
      }
    };

    console.log(form);

    if (image) {
      const name = "profile-" + doc;
      saveFile("images/users/" + name, image, imageUploaded);
    } else {
      const result = await updateData("users", doc, form);
      if (result.status) {
        setResult("success");
        setEditing(false);
      } else {
        setResult("error");
      }
      console.log(result);
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
        message="Dados alterados com sucesso!"
      />
      <CustomAlert
        open={result === "error"}
        handle={clearResult}
        severity="error"
        message="Ocorreu um erro, tente novamente!"
      />
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <CustomCard>
            <Typography variant="h4">Perfil</Typography>
            <Typography variant="subtitle1">
              Aqui você pode ver ou editar seus dados pessoais
            </Typography>
          </CustomCard>
        </Grid>
        <Grid item className={classes.item}>
          <CustomCard
            className={classes.card}
            button={
              <Grid container className={classes.content}>
                {editing ? (
                  <>
                    <Button variant="contained" color="primary" onClick={save}>
                      Salvar
                    </Button>
                    <Button color="primary" onClick={handleEditing}>
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditing}
                  >
                    Editar
                  </Button>
                )}
              </Grid>
            }
          >
            {!editing && (
              <Grid container direction="column" spacing={4}>
                {form.photo && (
                  <Grid item>
                    <Grid container justify="center">
                      <Avatar className={classes.avatar} src={form.photo} />
                    </Grid>
                  </Grid>
                )}
                <Grid item>
                  <Typography>Nome Completo:</Typography>
                  <Typography variant="h6">
                    {form.fullName || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography>SIAPE: </Typography>
                  <Typography variant="h6">
                    {form.siape || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography>Curso com maior carga horária:</Typography>
                  <Typography variant="h6">
                    {form.course || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography>Link do Lattes:</Typography>
                  <Typography variant="h6">
                    {form.lattes || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography>Titulação:</Typography>
                  <Typography variant="h6">
                    {form.specialization || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item>
                  <Typography>Área de Conhecimento:</Typography>
                  <Typography variant="h6">
                    {form.knowledgearea || "Não informado"}
                  </Typography>
                </Grid>
                <Divider />
              </Grid>
            )}

            {editing && (
              <form onSubmit={save}>
                <Grid container justify="center">
                  <Avatar className={classes.avatar} src={form.photo} />
                  <>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo"
                      type="file"
                      // value={form.photo}
                      onChange={onChangeImage}
                    />
                    <label htmlFor="photo">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                      >
                        Selecionar foto
                      </Button>
                    </label>
                  </>
                </Grid>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  label="Nome Completo"
                  id="fullName"
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
                  label="Siape"
                  id="siape"
                  type="tel"
                  onChange={onChange}
                  value={form.siape}
                />
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  style={{ width: "100%", marginTop: 15, marginBottom: 10 }}
                  required
                >
                  <InputLabel ref={courseLabel} id="input-course">
                    Curso com maior carga horária
                  </InputLabel>
                  <Select
                    labelWidth={labelsWidth.course}
                    labelId="input-course"
                    name="course"
                    value={form.course}
                    onChange={onChangeSelect}
                  >
                    <MenuItem value={"Engenharia de Pesca"}>
                      Engenharia de Pesca
                    </MenuItem>
                    <MenuItem value={"Ciências Biológicas"}>
                      Ciências Biológicas
                    </MenuItem>
                    <MenuItem value={"Turismo"}>Turismo</MenuItem>
                    <MenuItem value={"Engenharia de Produção"}>
                      Engenharia de Produção
                    </MenuItem>
                    <MenuItem value={"Sistemas de Informação"}>
                      Sistemas de Informação
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  required
                  autoComplete="none"
                  fullWidth
                  margin="normal"
                  label="Link do Lattes"
                  id="lattes"
                  onChange={onChange}
                  value={form.lattes}
                />
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  style={{ width: "100%", marginTop: 15, marginBottom: 10 }}
                  required
                >
                  <InputLabel
                    ref={specializationLabel}
                    id="input-specialization"
                  >
                    Titulação
                  </InputLabel>
                  <Select
                    labelWidth={labelsWidth.specialization}
                    labelId="input-specialization"
                    name="specialization"
                    value={form.specialization}
                    onChange={onChangeSelect}
                  >
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
                  label="Área de Conhecimento"
                  id="knowledgearea"
                  onChange={onChange}
                  value={form.knowledgearea}
                />
              </form>
            )}
          </CustomCard>
        </Grid>
      </Grid>
    </>
  );
}
