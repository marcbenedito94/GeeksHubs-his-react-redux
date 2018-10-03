import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import api from '../services/api';
import "./histories.css";
import "../dashboards/dashboard.css";

class histories extends React.Component {

  constructor(props) {
    super(props);
    let histories = api.getHistories();
    props.loadHistories(histories);
  }
  
  logout = () => {
    this.props.logoutStore();
  };
  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {
      const { role, name, uid } = this.props.auth;

      const histories = [
        {
          id: localStorage.getItem('id'),
          patient: localStorage.getItem('patient'),
          dni : localStorage.getItem('dni'),
          history: localStorage.getItem('history')
        }
      ]

      const links = [
        {
          to: "/patients",
          text: "Lista Pacientes",
          roles: ["admin", "doctor"]
        },
        {
          to: "/histories",
          text: "Lista Historias",
          roles: ["admin", "doctor"]
        },
        {
          to: "/createUser",
          text: "Create User",
          roles: ["admin", "technical"]
        },
        {
          to: "/patientDetail/"+ uid ,
          text: "Patients detail",
          roles: ["admin", "patient"]
        },
        {
          to: "/historyDetails/" + uid,
          text: "History detail",
          roles: ["admin", "patient"]
        }
      ];

        // const registries = [
        //     {
        //       id: "01",
        //       patient: "Marc",
        //       dni: "73656577D",
        //       history: "Dolor de cabeza"
        //     },
        //     {
        //       id: "02",
        //       patient: "Marc",
        //       dni: "73656577D",
        //       history: "Corte en la pierna"
        //     },
        //     {
        //       id: "03",
        //       patient: "Joan",
        //       dni: "73656577F",
        //       history: "Virus estomacal"
        //   }
        // ];

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

        <h1>Historias</h1>

        {
          
          this.props.histories.map(item => (
            <div key={item.uid} className="divHistories">
              <h4>{item.numberRegistry}</h4>
              <h4>{item.namePatient}</h4>
              <h4>{item.dniPatient}</h4>
              <h4>{item.history}</h4>
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
    histories: state.histories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutStore: () =>
      dispatch({
        type: "USER_LOGGED_OUT"
      }),
    loadHistories: (histories) => {
      dispatch({
        type:'LOAD_HISTORIES',
        histories: histories,
      })
    }
  };
};

const Histories = connect(
  mapStateToProps,
  mapDispatchToProps
)(histories);
export default Histories;
