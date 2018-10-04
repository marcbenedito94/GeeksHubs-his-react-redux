import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "../histories/histories.css";
import "../dashboards/dashboard.css"
import api from '../services/api';

class histories extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = 
    {
        numberRegistry: '',
        namePatient: '',
        dniPatient: '',
        history: '',
        uid:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
   
  }

  handleSubmit(event) {
    console.log('A history was submitted: ' + this.state.dniPatient);
    event.preventDefault();
    let {numberRegistry, namePatient, dniPatient ,history, uid} = this.state
    api.createHistory({numberRegistry, namePatient, dniPatient, history, uid});
    //api.getHistory();
    console.log({numberRegistry, namePatient, dniPatient, history});
  }

  logout = () => {
    this.props.logoutStore();
  };

  render() {
    if (!this.props.auth) {
      return <Redirect to="/login" />;
    } else {      
      const { role, name, uid } = this.props.auth;
      
      return (
        <section className="dashboard">
          <h3 className="btnLogout">
            <button onClick={this.logout}>Logout</button>
          </h3>

          <h1>Create History</h1>

          <form onSubmit={this.handleSubmit}>
          <label>uid:
          <input type="text" name="uid" value={this.state.uid} onChange={this.handleChange} />
          </label>
          <label>Number of Registry:
          <input type="text" name="numberRegistry" value={this.state.numberRegistry} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>Name of Patient:
          <input type="text" name="namePatient" value={this.state.namePatient} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>DNI of Patient:
          <input type="text" name="dniPatient" value={this.state.dniPatient} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <label>History:
          <input type="text" name="history" value={this.state.history} onChange={this.handleChange} />
          </label>
          <br/><br/>
          <input type="submit" value="Crear Historia" />
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
