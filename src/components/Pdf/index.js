import React, { useEffect, useState, useCallback } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { Button, Typography } from "@material-ui/core";
import { Print } from "@material-ui/icons";
import { useRouteMatch } from "react-router-dom";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row"
  },
  section: {
    padding: 10,
    flexGrow: 1
  },
  subsection: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#88f",
    padding: 5
  }
});

export default function Pdf({ loadData }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const handleData = async () => {
      await loadData(setData);
    };
    handleData();
  }, [loadData]);

  console.log(data);

  return !!Object.keys(data).length ? (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={{ ...styles.section, maxWidth: "40%" }}>
              <View style={styles.subsection}>
                <Image src={data.photo} style={{ width: 100, height: 100 }} />
                <Text>{data.fullName}</Text>
                <Text>Email: {data.email}</Text>
                <Text>Lattes: {data.lattes}</Text>
                <Text wrap={true}>
                  Reseach Gate: {data.researchGate} jkh jkh jkhjh j h hj hj hj
                  hj hj hj hj hj hj hj hj h jh jh kjekjekjekjekj kejk ejek jekje
                  k ejkej
                </Text>
                <Text>ORCID: {data.orcid}</Text>
              </View>
            </View>
            <View style={{ ...styles.section, maxWidth: "60%" }}>
              <View style={styles.subsection}>
                <Text>Resumo: {data.resume}</Text>
                <Text>Titulação: {data.specialization}</Text>
                <Text>Publicações:</Text>
                {data.publications.map((v, i) => {
                  return <Text key={i}>{v}</Text>;
                })}
              </View>
            </View>
          </Page>
        </Document>
      }
      fileName="shortbio.pdf"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {({ loading }) =>
        loading ? (
          <Button disabled color="primary" variant="contained">
            <Typography>Carregando Impressão</Typography>
          </Button>
        ) : (
          <Button color="primary" variant="contained">
            <Typography>Imprimir</Typography>
            <Print style={{ marginLeft: 10 }} />
          </Button>
        )
      }
    </PDFDownloadLink>
  ) : (
    <span />
  );
}
