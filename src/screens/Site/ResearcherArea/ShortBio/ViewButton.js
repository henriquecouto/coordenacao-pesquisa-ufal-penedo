import React, { createRef, useState, useEffect } from "react";
import {
  Button,
  Grid,
  Avatar,
  Typography,
  Divider,
  Icon,
  SvgIcon
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Print as PrintIcon,
  MailOutline as MailIcon
} from "@material-ui/icons";
import { savePDF } from "@progress/kendo-react-pdf";
import CustomModal from "../../../../components/CustomModal";
import "./pdfStyles.css";

class DocService {
  createPdf = html => {
    savePDF(html, {
      paperSize: "A4",
      fileName: "Biografia_do_Pesquisador.pdf",
      margin: 3
    });
  };
}

const Doc = new DocService();

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 1),
    fontFamily: '"DejaVu Sans", "Arial", sans-serif'
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 200
  },
  divider: {
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2, 0)
  },
  icon: {
    padding: theme.spacing(0.5),
    borderRadius: "100%",
    borderColor: theme.palette.primary.main,
    borderWidth: theme.spacing(0.4),
    borderStyle: "solid",
    height: 50,
    width: 50,
    objectFit: "cover",
    fontSize: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function ViewButton({ data, className }) {
  const contentToPrint = createRef();
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(old => !old);
  };

  const createPdf = () => {
    Doc.createPdf(contentToPrint.current);
  };

  console.log(data);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={className}
        onClick={handleModal}
      >
        Visualizar Impressão <PrintIcon style={{ marginLeft: 10 }} />
      </Button>
      <CustomModal
        handleClose={handleModal}
        open={modal}
        title="Visualização de Impressão"
        actions={[
          () => (
            <>
              <Button
                color="primary"
                className={className}
                onClick={handleModal}
              >
                Fechar
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={className}
                onClick={createPdf}
              >
                Imprimir <PrintIcon style={{ marginLeft: 10 }} />
              </Button>
            </>
          )
        ]}
      >
        <section
          ref={contentToPrint}
          className="root"
          style={{ margin: "0 15px" }}
        >
          <Divider className={classes.divider} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid container direction="column" alignItems="center">
                <Avatar src={data.photo} className={classes.photo} />
                <h1>{data.fullName}</h1>
              </Grid>
              <Divider className={classes.divider} />
              <Grid container direction="column" alignItems="center">
                <div className={classes.icon}>
                  <img
                    src={require("../../../../assets/icons/mail.svg")}
                    alt=""
                  />
                </div>
                <span>{data.email}</span>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ marginTop: 20 }}
              >
                <a
                  href={data.researchGate}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Grid container direction="column" alignItems="center">
                    <img
                      className={classes.icon}
                      src={require("../../../../assets/icons/research-gate.png")}
                      alt=""
                    />
                    ResearchGate
                  </Grid>
                </a>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="center"
                style={{ marginTop: 20 }}
              >
                <a
                  href={"https://orcid.org/" + data.orcid}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Grid container direction="column" alignItems="center">
                    <img
                      className={classes.icon}
                      src={require("../../../../assets/icons/orcid.png")}
                      alt=""
                    />
                    ORCID
                  </Grid>
                </a>
              </Grid>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs>
              <Grid container direction="column">
                <h2 align="center">BIOGRAFIA</h2>
                <Divider className={classes.divider} />
                <h1>RESUMO</h1>
                <span>{data.resume}</span>
              </Grid>

              <Grid container direction="column">
                <Divider className={classes.divider} />
                <h1>FORMAÇÃO ACADÊMICA</h1>
                {/* <p align="justify">{data.specialization}</p> */}
                {data.education.map((v, i) => {
                  return <p key={i}>{v}</p>;
                })}
              </Grid>
              <Grid container direction="column">
                <Divider className={classes.divider} />
                <h1>PUBLICAÇÕES RECENTES</h1>

                {data.publications.map((v, i) => {
                  return <p key={i}>{v}</p>;
                })}
                <Divider className={classes.divider} />
              </Grid>
            </Grid>
          </Grid>
        </section>
      </CustomModal>
    </>
  );
}
