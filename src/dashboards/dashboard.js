import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import "./dashboard.css";
import "../styles.css";

class dashboard extends React.Component {
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
        }];

      return (
        <section className="dashboard">
          <h3 className="btnLogout">
            {<button onClick={this.logout}>Logout</button>}
          </h3>

          <div class="titles">
            <h1 className="title">Dashboard</h1>
          </div>

         {
           links.map( item => (              
              item.roles.includes(role) 
              && 
              <div>
                <Link to={item.to}>{item.text}</Link>
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

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(dashboard);
export default Dashboard;