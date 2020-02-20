import React from "react";
import { Router, Route, Switch } from "react-router-dom";


import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Chat from "./views/Chat";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";


// styles

import "./styles/App.css";
import './styles/styles.scss'
// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
        <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/chat" component={Chat} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        <Footer />
    </Router>
  );
};

export default App;
