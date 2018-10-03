import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import api from '../services/api';

class historyDetails extends React.Component {
  logout = () => {
    this.props.logoutStore();
  };
  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {
      const { role, name, uid, username} = this.props.auth;

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
      }
      ];

      return (
        <section className="dashboard">
            <h3 className="btnLogout">
                <button onClick={this.logout}>Logout</button>
            </h3>

            <h1>Details of {name}</h1>
            <h4>{this.props.}</h4>
            <h4>{username}</h4>
        </section>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    patients: state.patients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutStore: () =>
      dispatch({
        type: "USER_LOGGED_OUT"
      }),
    loadPatients: (patients) => {
      dispatch({
        type:'LOAD_PATIENTS',
        patients: patients,
      })
    }
  };
};

const HistoryDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(historyDetails);
export default HistoryDetails;
