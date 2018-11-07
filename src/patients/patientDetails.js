import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import api from '../services/api';

class patientDetails extends React.Component {
  constructor(props) {
    super(props);
    let uid = this.props.auth;
    let patient = api.getPatient(uid);
    props.loadPatient(patient);
  
  }

  logout = () => {
    this.props.logoutStore();
  };
  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {
      const { role, uid } = this.props.auth;

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

        {
          links.map(
            item => (
            item.roles.includes(role) 
            && 
            <Link to={item.to}>{item.text}</Link>
            )
          )
        }

        {
          api.getPatient(this.props.match.params.uid.toString()).map(item => (
            <div key={item.uid}>
              <div class="titles">
                <h1 className="title">Details of {item.name}</h1>
              </div>

              <h4>ID of User: {item.uid}</h4>
              <h4>Role of User: {item.role}</h4>
              <h4>Username: {item.username}</h4>
              <h4>Password: {item.password}</h4>
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
    patient: state.patient
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutStore: () =>
      dispatch({
        type: "USER_LOGGED_OUT"
      }),
    loadPatient: (patient) => {
      dispatch({
        type:'LOAD_PATIENT',
        patient: patient,
      })
    }
  };
};

const PatientDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(patientDetails);
export default PatientDetails;
