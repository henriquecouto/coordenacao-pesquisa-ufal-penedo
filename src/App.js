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
import ResearchGroups from "./screens/ResearchGroup";
import Postgraduate from "./screens/Postgraduate";
import Coordination from "./screens/Coordination";

const routes = [
  {
    render: <Home />,
    path: "/",
    name: "Início",
    icon: <HomeIcon />
  },
  {
    render: <ResearcherArea />,
    path: "/area-do-pesquisador",
    name: "Área do Pesquisador",
    icon: <ResearcherAreaIcon />
  },
  {
    render: <Pibic />,
    path: "/pibic",
    name: "PIBIC",
    icon: <PibicIcon />
  },
  {
    render: <ResearchGroups />,
    path: "/grupos-de-pesquisa",
    name: "Grupos de Pesquisa",
    icon: <ReseachGroupsIcon />
  },
  {
    render: <Postgraduate />,
    path: "/pos-graduacao",
    name: "Pós Graduação",
    icon: <PostgraduateIcon />
  },
  {
    render: <Coordination />,
    path: "/coordenacao",
    name: "Coordenação",
    icon: <CoordinationIcon />
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
