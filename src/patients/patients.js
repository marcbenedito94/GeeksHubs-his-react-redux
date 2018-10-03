import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
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
