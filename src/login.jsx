import React from "react";
import api from "./services/api";
import "./login.css";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null
    };
  }
  login(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    let user = api.login(username, password);
    if (user) {
      // valid user
      this.props.loginStore(user);
      // this.props.history.push("/");
    } else {
      // no valid user
      this.setState({ error: "invalid username or password" });
    }
  }
  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: null
    });
  }
  render() {
    if (this.props.auth) {
      return <Redirect to="/" />;
    }
    return (
      <section className="login">
        {this.state.error ? (
          <div className="error"> {this.state.error}</div>
        ) : null}
        <form onSubmit={this.login.bind(this)}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
          />
          <button type="submit">Entrar</button>
        </form>
      </section>
    );
  }
}

const Login = connect(
  state => ({
      auth: state.auth
  }),
  dispatch => ({
    loginStore: user =>
      dispatch({
        type: "USER_LOGGED_IN",
        payload: user
      })
  })
)(login);
export default Login;
