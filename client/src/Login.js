import React, { Component } from "react";
import {
  Route,
  HashRouter,
  NavLink
} from "react-router-dom";

import Articlelist from "./Articlelist";
import Register from "./Register";


const API = "http://localhost:5000/api/logged-in";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {status: "init"};
  //Bindings: 
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchRegister = this.fetchRegister.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
                  email: event.target.value
                  });
  }

  handlePasswordChange(event) {
    this.setState({
                  password: event.target.value
                  });
  }

  handleSubmit(event) {
    console.log("Sending request to server");
    
    const data = new FormData(event.target)     
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({"email": this.refs.email.value, 
        "password": this.refs.password.value})
    })
    .then(response => response.json())
    .then(server_status => this.setState({ status: server_status }))
  }

  fetchRegister(event) {
    console.log("Fetch registration form")
    this.setState({
                  status: "register"
    });
  }
  


  render() {
    const { status, email, password } = this.state;
    if (this.state.status === "success") {
      return( <Articlelist/> );
    } 
    else if (this.state.status === "register"){
      return (<Register />);
    }
    
    else {
        let message = "";
        if (this.state.status === "init") {
          message = "Welcome! Please login to read filtered news...";
        }
        else {
          message = "Incorrect details.";
        }

      return(
          <div>
            <h2> {message} </h2>
            <form onSubmit={this.handleSubmit}>
              <label>
                User ID:
                <input 
                  type="email" 
                  name="email"
                  ref="email"
                  value = {this.state.email}
                  onChange = {this.handleEmailChange}
                  required
                />
              </label>
              <label>
                Password:
                <input 
                type="password" 
                name="password"
                ref="password"
                value = {this.state.password} 
                onChange = {this.handlePasswordChange}             
                required
                />
              </label>
              <input type="submit" value="Submit" /> 
            </form><br/><br/>
            <button onClick={this.fetchRegister}>Register</button> 
          </div>

      )
    }
  }
}

export default Login;
