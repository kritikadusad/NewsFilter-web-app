import React, { Component } from "react";
import {logInForm, registerButton} from "./styles";
import {Button, Form, FormGroup, Row, Col} from 'reactstrap';
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
        message = "Email already in use. Please try again.";
      }
      else {
        message = "Please register here";
      }
      return(
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h1 className="h3 mb-3 font-weight-normal text-center">{message}</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} class="form-control" placeholder="Email address" required autofocus/>
          <label for="inputPassword" className="sr-only">Password</label>
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
          <label for="inputTriggers" className="sr-only">Triggers</label>
          <input type="triggers" value={this.state.triggers} onChange={this.handleTriggerChange} className="form-control" placeholder="Triggers" required/>
          <button className="btn btn-lg btn-block nf-btn" type="submit" value="Submit">Create Account</button>
        </form>
      )
    }
  }
}

export default Register;
