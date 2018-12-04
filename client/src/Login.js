import React, { Component } from "react";
// import {
//   Route,
//   HashRouter,
//   NavLink
// } from "react-router-dom";

import Articlelist from "./Articlelist";
import Register from "./Register";


const API = "http://localhost:5000/logged-in";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {status: "init",
                  email: "",
                  password: ""};
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
    event.preventDefault();
    console.log("Sending request to server");
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({"email": this.state.email, 
        "password": this.state.password})
    })
    .then(response => response.json())
    .then(server_status => this.setState({ status: server_status }))
    console.log(this.state.status)  
  }

  fetchRegister(event) {
    console.log("Fetch registration form")
    event.preventDefault();
    this.setState((state) => {
    // Important: read `state` instead of `this.state` when updating.
      return {status: "register",
      email: "", 
      password: "",
      triggers:""}
    });
  }
  

  render() {
    if (this.state.status === "success") {
      return (<Articlelist logged_user={this.state.email}/> );
    } 
    else if (this.state.status === "register"){
      return (<Register/>);
    }
    
    else {
        let message = "";
        if (this.state.status === "init") {
          message = "Welcome! Please login to read filtered news...";
        }
        else if (this.state.status === "successfully added"){
          message = "Successfully registered. You can login now..."
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
