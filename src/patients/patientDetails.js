import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import api from '../services/api';

class patientDetails extends React.Component {
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
      const { role, name, uid, username } = this.props.auth;

      const patients = localStorage.getItem('users');

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

        {
          this.props.patients.map(item => (
            <div key={item.uid}>
              <h1>Details of {item.name}</h1>
              <h4>User ID: {item.uid}</h4>
              <h4>Role: {item.role}</h4>
              <h4>Username: {item.username}</h4>
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

const PatientDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(patientDetails);
export default PatientDetails;
