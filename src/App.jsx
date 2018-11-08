import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import React, { Component } from "react";
import Dashboard from "./dashboards/dashboard";
import Histories from "./histories/histories";
import HistoryDetails from './histories/historyDetails';
import Patients from "./patients/patients";
import PatientDetails from './patients/patientDetails';
import CreateUser from "./createUser/createUser";
import CreateHistory from './histories/createHistory';
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
                <Route path="/historyDetails/:uid" component={HistoryDetails} exact />
                <Route path="/patients" component={Patients} exact />
                <Route path="/patientDetails/:uid" component={PatientDetails} exact />
                <Route path="/createUser" component={CreateUser} exact />
                <Route path="/createHistory" component={CreateHistory} exact />
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