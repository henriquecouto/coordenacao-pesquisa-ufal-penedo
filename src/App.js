import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import Header from "./components/Header";

const routes = [
  {
    render: <Typography variant="h1">Início</Typography>,
    path: "/",
    name: "Início",
    icon: () => <HomeIcon />
  },
  {
    render: <Typography variant="h1">Área do Pesquisador</Typography>,
    path: "/area-do-pesquisador",
    name: "Área do Pesquisador",
    icon: () => <HomeIcon />
  },
  {
    render: <Typography variant="h1">PIBIC</Typography>,
    path: "/pibic",
    name: "PIBIC",
    icon: () => <HomeIcon />
  },
  {
    render: <Typography variant="h1">Grupod de Pesquisa</Typography>,
    path: "/grupos-de-pesquisa",
    name: "Grupos de Pesquisa",
    icon: () => <HomeIcon />
  },
  {
    render: <Typography variant="h1">Pós Graduação</Typography>,
    path: "/pos-graduacao",
    name: "Pós Graduação",
    icon: () => <HomeIcon />
  },
  {
    render: <Typography variant="h1">Coordenação</Typography>,
    path: "/coordenacao",
    name: "Coordenação",
    icon: () => <HomeIcon />
  }
];

function App() {
  const [position, setPosition] = useState("/");
  return (
    <Router>
      <Header position={position} routes={routes}>
        {routes.map(v => {
          return (
            <Route exact path={v.path} key={v.path}>
              {v.render}
            </Route>
          );
        })}
      </Header>
    </Router>
  );
}

export default App;
