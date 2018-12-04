import React, { Component } from "react";

import Login from "./Login";
const API = "http://localhost:5000/register";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {status: "register form",
                    email: "",
                  password: "",
                  triggers:""
                };
//Bindings: 
  this.handleTheEmailChange = this.handleTheEmailChange.bind(this);
  this.handlePasswordChange = this.handlePasswordChange.bind(this);
  this.handleTriggerChange = this.handleTriggerChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
 
  }

  handleTheEmailChange(event) {
    this.setState({
                  email: event.target.value
                  });
  }

  handlePasswordChange(event) {
    this.setState({
                  password: event.target.value
                  });
  }

  handleTriggerChange(event) {
    this.setState({
                  triggers: event.target.value
                  });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("Sending details from registration form");
    
        fetch(API, {
          method: 'POST',
          body: JSON.stringify({"email": this.state.email, 
                                "password": this.state.password,
                                "triggers": this.state.triggers
                              })
        })
        .then(response => response.json())
        .then(server_status => this.setState({ 
          status: server_status })
        )
    
  }
  render() {
    if (this.state.status === "successfully added") {
      return( <Login/> );
    } 
    else {
      let message = "";
      if (this.state.status === "user already registered.") {
        message = "This email is already in use. Please try again.";
      }
      else {
        message = "Please register here.";
      }
      return(
              <div>
                <h2>{message}</h2>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    User ID:
                    <input 
                      type="email" 
                      name="email"
                      value = {this.state.email}
                      onChange = {this.handleTheEmailChange}
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
                  <label>
                    Triggers:
                    <input 
                    type="text" 
                    name="triggers" 
                    value = {this.state.triggers} 
                    onChange = {this.handleTriggerChange}
                    required
                    />
                  </label>
                  <input type="submit" value="Submit" /> 
                </form><br/><br/>
              </div>
        )
      }
    }
  }

export default Register;
