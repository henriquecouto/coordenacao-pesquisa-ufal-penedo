import React, { useState, useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import {
  Home as HomeIcon,
  LocalLibrary as ResearcherAreaIcon,
  FindInPage as PibicIcon,
  GroupWork as ReseachGroupsIcon,
  School as PostgraduateIcon,
  Event as EventIcon,
} from "@material-ui/icons";
import Header from "../../components/HeaderSite";
import Pibic from "./Pibic";
import ResearchGroups from "./ResearchGroups";
import Postgraduate from "./Postgraduate";
import ResearcherArea from "./ResearcherArea";
import Event from "./Events";
import Home from "./Home";

const routes = baseUrl => ({
  Home: {
    render: handlePosition => <Home setPosition={handlePosition} />,
    path: baseUrl + "/",
    name: "Página Inicial",
    icon: <HomeIcon />
  },
  Pibic: {
    render: handlePosition => <Pibic setPosition={handlePosition} />,
    path: baseUrl + "/pibic",
    name: "PIBIC",
    icon: <PibicIcon />
  },
  ResearchGroups: {
    render: handlePosition => <ResearchGroups setPosition={handlePosition} />,
    path: baseUrl + "/grupos-de-pesquisa",
    name: "Grupos de Pesquisa",
    icon: <ReseachGroupsIcon />
  },
  Postgraduate: {
    render: handlePosition => <Postgraduate setPosition={handlePosition} />,
    path: baseUrl + "/pos-graduacao",
    name: "Pós Graduação",
    icon: <PostgraduateIcon />
  },
  Events: {
    render: handlePosition => <Event setPosition={handlePosition} />,
    path: baseUrl + "/eventos",
    name: "Eventos",
    icon: <EventIcon />
  },
  ResearcherArea: {
    render: handlePosition => <ResearcherArea setPosition={handlePosition} />,
    path: baseUrl + "/area-do-pesquisador",
    name: "Área do Pesquisador",
    icon: <ResearcherAreaIcon />,
    notExact: true
  }
});

export default function Site() {
  const [position, setPosition] = useState("");
  const [finalRoutes, setFinalRoutes] = useState([]);
  const match = useRouteMatch();

  const handlePosition = newPosition => {
    setPosition(finalRoutes[newPosition].name);
  };

  useEffect(() => {
    setFinalRoutes(routes(match.url));
  }, [match.url]);

  return (
    <Header position={position} routes={finalRoutes}>
      {Object.keys(finalRoutes).map(route => {
        return (
          <Route
            exact={!finalRoutes[route].notExact}
            path={finalRoutes[route].path}
            key={finalRoutes[route].path}
          >
            {finalRoutes[route].render(handlePosition)}
          </Route>
        );
      })}
    </Header>
  );
}
