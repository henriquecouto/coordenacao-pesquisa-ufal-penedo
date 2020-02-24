import React, { useState, useEffect } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import {
  Home as HomeIcon,
  LocalLibrary as ResearcherAreaIcon,
  FindInPage as PibicIcon,
  GroupWork as ReseachGroupsIcon,
  School as PostgraduateIcon,
} from "@material-ui/icons";

import Header from "../../components/HeaderAdmin";
import Home from "./Home";
import SignIn from "../SignIn";
import { listenLogin } from "../../services/auth";
import { loadLoggedUser } from "../../services/db";
import ForgotPass from "../ForgotPass";
import { Grid, CircularProgress } from "@material-ui/core";
import ErrorMessage from "../../components/ErrorMessage";
import Pibic from "./Pibic";

const routes = baseUrl => ({
  Home: {
    render: handlePosition => <Home setPosition={handlePosition} />,
    path: baseUrl,
    name: "Página Inicial",
    icon: <HomeIcon />
  },
  Pibic: {
    render: handlePosition => <Pibic setPosition={handlePosition} />,
    path: baseUrl + "/pibic",
    name: "Projetos PIBIC",
    icon: <PibicIcon />
  }
});

export default function Site() {
  const [position, setPosition] = useState("");
  const [finalRoutes, setFinalRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState({ status: false });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");
  const match = useRouteMatch();

  const handlePosition = newPosition => {
    setPosition(finalRoutes[newPosition].name);
  };

  const handleLogged = async res => {
    try {
      await loadLoggedUser(async user => {
        if (user.type !== "default") {
          setLogged(res);
          setLoading(false);
        } else {
          setError(
            <ErrorMessage
              message="Acesso restrito. Para acessar a Área do Pesquisador clique aqui!"
              action={() => setRedirect("/site/area-do-pesquisador")}
              cursor="pointer"
            />
          );
          setLogged({ status: false });
          setLoading(false);
        }
      }, res.uid);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFinalRoutes(routes(match.url));
  }, [match.url]);

  useEffect(() => {
    setLoading(true);
    listenLogin(handleLogged);
  }, []);

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (loading) {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (!logged.status) {
    return (
      <>
        <Route exact path={match.url + "/"}>
          {error}
          <SignIn setLoading={setLoading} />
        </Route>
        <Route exact path={match.url + "/forgot-password"}>
          <ForgotPass setLoading={setLoading} />
        </Route>
      </>
    );
  }

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
