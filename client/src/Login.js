import React, { Component } from "react";
import {
  Route,
  HashRouter
} from "react-router-dom";

import Articlelist from "./Articlelist";

const API = "http://localhost:5000/logged-in";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {status: "init",
                  email: "",
                  password: ""};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
                  email: event.target.value,
                  });
  }

  handlePasswordChange(event) {
    this.setState({
                  password: event.target.value,
                  });
  }
  handleSubmit(event) {
    console.log("Sending request to server");
    event.preventDefault();
    const data = new FormData(event.target)     
        fetch(API, {
          method: 'POST',
          body: JSON.stringify({"email": this.state.email, 
            "password": this.state.password})
        })
        .then(response => response.json())
        .then(server_status => this.setState({ status: server_status }))
    
  }

  render() {
    const { status, email, password } = this.state;
    if (this.state.status === "success") {
      return( <Articlelist/> );
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
          </form>
        </div>
      )
    }
  }
}

    export default Login;
