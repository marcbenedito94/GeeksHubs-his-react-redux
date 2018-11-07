import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import React from "react";

import api from '../services/api';

class patients extends React.Component {
  constructor(props) {
  super(props);
    let patients = api.getPatients();
    props.loadPatients(patients);

  }
  logout = () => {
    this.props.logoutStore();
  };
  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {

      const { uid } = this.props.auth;

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
        }
        ];
      
      return (
        <section className="dashboard">
        <h3 className="btnLogout">
            <button onClick={this.logout}>Logout</button>
        </h3>

        <h1>Patients</h1>

        {
          this.props.patients.map(item => (
            <div key={item.uid}>
              { <Link to={'/patientDetails/'+item.uid}>{item.name}</Link> }
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

const Patients = connect(
  mapStateToProps,
  mapDispatchToProps
)(patients);
export default Patients;
