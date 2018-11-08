import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import api from '../services/api';

import "../dashboards/dashboard.css";
import "../styles.css";

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
          to: "/patientDetail/"+ uid ,
          text: "Patients detail",
          roles: ["admin", "patient"]
        },
        {
          to: "/historyDetails/" + uid,
          text: "History detail",
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
            ))
        }

        <div class="titles">
          <h1 className="title">Histories</h1>
        </div>

        {          
          this.props.histories.map(item => (
            <div key={item.numberRegistry}>
              { <Link to={'/historyDetails/'+item.numberRegistry}>{item.namePatient}</Link> }
              <br/>
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