import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getFile } from "../../../services/storage";
import CustomCard from "../../../components/CustomCard";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[300],
    minHeight: window.innerHeight - 64
  },
  header: {
    height: window.innerHeight - 400,
    maxWidth: 1000
  },
  item: {
    maxWidth: 1200,
    padding: theme.spacing(2, 2, 2, 2)
  },
  activities: {
    maxWidth: 400,
    marginTop: theme.spacing(2)
  }
}));

export default function Home({ setPosition }) {
  const classes = useStyles();
  const [logo, setLogo] = useState("");

  const handleImage = async () => {
    setLogo(await getFile("assets/logo-ufal.png"));
  };

  useEffect(() => {
    handleImage();
  }, []);

  useEffect(() => {
    setPosition("Home");
  }, [setPosition]);
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid
        item
        container
        className={`${classes.item}, ${classes.header}`}
        direction="column"
        justify="center"
      >
        <Typography variant="h2">Coordenação de Pesquisa</Typography>
        <Typography variant="h2">Unidade Educacional de Penedo</Typography>
      </Grid>

      <Grid item container className={classes.item}>
        <CustomCard variant="light">
          <Typography variant="body1">
            A{" "}
            <strong>
              Coordenação de Pesquisa da Unidade Educacional de Penedo
            </strong>{" "}
            é responsável por articular a pesquisa às atividades de ensino e de
            extensão; prospectar as possibilidades de parcerias para pesquisa e
            inovação; fomentar a realização de eventos de pesquisa e fortalecer
            e acompanhar os grupos de pesquisa certificados pelo CNPQ.
          </Typography>
          <Typography variant="body1">
            Além disso, a coordenação de pesquisa integra o comitê assessor da
            Pró-Reitoria de Pesquisa da UFAL e tem como principais atribuições
            locais as seguintes atividades:
          </Typography>
          <Grid container spacing={2} justify="center">
            <Grid item container className={classes.activities} spacing={2}>
              <Grid item>
                <Typography>
                  Apreciar e dar parecer aos projetos de pesquisa apresentados
                  pelos docentes da Unidade;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Encaminhar para o avaliadores externos a análise do mérito dos
                  projetos de pesquisa da Unidade que visam à concessão de
                  bolsas de iniciação científica, tecnológica e financiamentos
                  em geral;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Acompanhar e avaliar projetos de pesquisa em execução e
                  mediante análise de relatórios da produção científica,
                  científica, tecnológica, artística e cultural gerada, dando
                  parecer circunstanciado;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Formar Comissão Interna para auxiliar no processo das
                  atividades de pesquisa da unidade acadêmica;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Constituir e manter atualizado o quadro de consultores “ad
                  hoc” a fim de auxiliar as avaliações externas dos Projetos;
                </Typography>
              </Grid>
            </Grid>
            <Grid item container className={classes.activities} spacing={2}>
              <Grid item>
                <Typography>
                  Desenvolver estudos e análises e promover debates que permitam
                  fornecer subsídios para a fixação, aperfeiçoamento e
                  modificação da política de pesquisa da unidade acadêmica;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Manifestar-se sobre qualquer assunto relativo às atividades de
                  pesquisa da unidade acadêmica, quando solicitado;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Manifestar-se sobre os aspectos legais dos projetos da unidade
                  acadêmica que representa;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Criar e manter atualizado um banco de dados sobre as pesquisas
                  da unidade acadêmica que representa;
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  Zelar pelos cumprimentos das Normas e Editais vigentes
                  relativos ao Pibic e Pibiti.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    </Grid>
  );
}
