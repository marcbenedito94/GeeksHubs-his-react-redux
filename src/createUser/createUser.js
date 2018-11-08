import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import api from '../services/api';

import "../dashboards/dashboard.css";
import "../styles.css";

class histories extends React.Component {
  
  constructor (props) {
    super(props);

    this.state = 
    {
      role: '',
      username: '',
      name: '',
      password: '',
      uid: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});   
  }

  handleSubmit(event) {
    event.preventDefault();
    let {role, username, name, password, uid} = this.state;
    api.createUser({role, username, name, password, uid});
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

          <div class="titles">
            <h1 className="title">Create User</h1>
          </div>

          <form onSubmit={this.handleSubmit}>
          <label>Role:
          <input type="text" name="role" value={this.state.role} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>Name of User:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>Password:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>ID of User:
          <input type="text" name="uid" value={this.state.uid} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <input type="submit" value="Crear Usuario" />
          </form>
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
