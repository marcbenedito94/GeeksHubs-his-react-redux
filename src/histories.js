import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./histories.css";
import "./dashboard.css"

class histories extends React.Component {
  logout = () => {
    this.props.logoutStore();
  };
  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {
      const { role, name, uid } = this.props.auth;

      const links = [
        {
          to: "/patientsList",
          text: "Patients list",
          roles: ["admin", "doctor"]
        },
        {
          to: "/histories",
          text: "Histories list",
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
          to: "/historyDetail/" + uid,
          text: "History detail",
          roles: ["admin", "patient"]
        }
      ];

        const registries = [
            {
                id: "01",
                patient: "Marc",
                dni: "73656577D",
                history: "Dolor de cabeza"
            },
            {
                id: "02",
                patient: "Marc",
                dni: "73656577D",
                history: "Corte en la pierna"
            }
        ];

      return (
        <section className="dashboard">
        <h3 className="btnLogout">
            <button onClick={this.logout}>Logout</button>
        </h3>

        <h1>Histories</h1>

        {
            registries.map(
                item => (
                <div className="divHistories">
                    
                    <h4>Registro {item.id}</h4>
                    <h4>{item.patient}</h4>
                    <h4>{item.dni}</h4>
                    <h4>{item.history}</h4>
                </div>
                )
            )
        }
        </section>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutStore: () =>
      dispatch({
        type: "USER_LOGGED_OUT"
      })
  };
};

const Histories = connect(
  mapStateToProps,
  mapDispatchToProps
)(histories);
export default Histories;
