import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Home as HomeIcon,
  LocalLibrary as ResearcherAreaIcon,
  FindInPage as PibicIcon,
  GroupWork as ReseachGroupsIcon,
  School as PostgraduateIcon,
  AssignmentInd as CoordinationIcon
} from "@material-ui/icons";
import Header from "./components/Header";
import Home from "./screens/Home";
import ResearcherArea from "./screens/ResearcherArea";
import Pibic from "./screens/Pibic";
import ResearchGroups from "./screens/ResearchGroups";
import Postgraduate from "./screens/Postgraduate";
import Coordination from "./screens/Coordination";

const routes = {
  Home: {
    render: handlePosition => <Home setPosition={handlePosition} />,
    path: "/",
    name: "Página Inicial",
    icon: <HomeIcon />
  },
  Pibic: {
    render: handlePosition => <Pibic setPosition={handlePosition} />,
    path: "/pibic",
    name: "PIBIC",
    icon: <PibicIcon />
  },
  ResearchGroups: {
    render: handlePosition => <ResearchGroups setPosition={handlePosition} />,
    path: "/grupos-de-pesquisa",
    name: "Grupos de Pesquisa",
    icon: <ReseachGroupsIcon />
  },
  Postgraduate: {
    render: handlePosition => <Postgraduate setPosition={handlePosition} />,
    path: "/pos-graduacao",
    name: "Pós Graduação",
    icon: <PostgraduateIcon />
  },
  Coordination: {
    render: handlePosition => <Coordination setPosition={handlePosition} />,
    path: "/coordenacao",
    name: "Coordenação",
    icon: <CoordinationIcon />
  },
  ResearcherArea: {
    render: handlePosition => <ResearcherArea setPosition={handlePosition} />,
    path: "/area-do-pesquisador",
    name: "Área do Pesquisador",
    icon: <ResearcherAreaIcon />,
    notExact: true
  }
};

function App() {
  const [position, setPosition] = useState("");

  const handlePosition = newPosition => {
    setPosition(routes[newPosition].name);
  };

  return (
    <Router>
      <Header position={position} routes={routes}>
        {Object.keys(routes).map(route => {
          return (
            <Route
              exact={!routes[route].notExact}
              path={routes[route].path}
              key={routes[route].path}
            >
              {routes[route].render(handlePosition)}
            </Route>
          );
        })}
      </Header>
    </Router>
  );
}

export default App;
