import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import api from '../services/api';

class historyDetails extends React.Component {
  
  constructor(props) {
    super(props);
    let uid = this.props.auth;
    let history = api.getHistory(uid);
    props.loadHistory(history);
  }

  logout = () => {
    this.props.logoutStore();
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {
      const { role, uid} = this.props.auth;

      const links = [
      {
        to: "/patients",
        text: "Patients List",
        roles: ["admin", "doctor"]
      },
      {
        to: "/histories",
        text: "Histories List",
        roles: ["admin", "doctor"]
      },
      {
        to: "/createHistory",
        text: "Create History",
        roles: ["admin", "doctor"]
      },
      {
        to: "/createUser",
        text: "Create User",
        roles: ["admin", "technical"]
      },
      {
        to: "/patientDetails/"+ uid ,
        text: "Patient Details",
        roles: ["admin", "patient"]
      },
      {
        to: "/historyDetails/" + uid,
        text: "History Details",
        roles: ["admin", "patient"]
      }];

      return (
        <section className="dashboard">
          <h3 className="btnLogout">
              <button onClick={this.logout}>Logout</button>
          </h3>

          {
            links.map( item => (
              item.roles.includes(role) 
              && 
              <Link to={item.to}>{item.text}</Link>
              )
            )
          }

          {          
            api.getHistory(this.props.match.params.uid.toString()).map(item => (
              <div key={item.numberRegistry}>
                <div class="titles">
                  <h1 className="title">Details of History nº {item.numberRegistry}</h1>
                </div>

                <h4>DNI of Patient: {item.dniPatient}</h4>
                <h4>Name of Patient: {item.namePatient}</h4>
                <h4>Description: {item.history}</h4>
              </div>
            ))            
          }
        </section>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    history: state.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutStore: () =>
      dispatch({
        type: "USER_LOGGED_OUT"
      }),
    loadHistory: (history) => {
      dispatch({
        type:'LOAD_HISTORY',
        history: history,
      })
    }
  };
};

const HistoryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(historyDetails);
export default HistoryDetails;