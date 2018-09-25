import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./dashboard";
import Histories from "./histories";
import Patients from "./patients";
import Login from "./login.jsx";
import NotFound from "./notFound";

import { Provider } from "react-redux";
import store from './store';
class App extends Component {
  render() {
    return  (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
              <Switch>
                <Route path="/histories" component={Histories} exact />
                <Route path="/patients" component={Patients} exact />
                <Route path="/" component={Dashboard} exact />
                <Route path="/login" component={Login} exact />                
                <Redirect path="/entrar" to="/login" />
                <Route component={NotFound} />
              </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
