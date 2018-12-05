import React, { Component } from "react";

import Articlelist from "./Articlelist";
import Register from "./Register";
import {Button, Form, Input, Label, FormGroup} from 'reactstrap';

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
        <Form className = "text-center" >
          <div className="form-signin">
            <h2 className="h3 mb-3 font-weight-normal"> {message} </h2>
            <FormGroup onSubmit={this.handleSubmit}>
              <Label>
                User ID:
                <Input 
                  type="email" 
                  className = "form-control"
                  placeholder = "Email address"
                  name="email"
                  value = {this.state.email}
                  onChange = {this.handleEmailChange}
                  required
                />
              </Label>
              </FormGroup>
            
            <br/>
              <Label>
                Password:
                <Input 
                type="password"
                className = "form-control"
                placeholder = "Password" 
                name="password" 
                value = {this.state.password} 
                onChange = {this.handlePasswordChange} 
                required
                />
              </Label>
              <br/>
              <Button type="submit" style= {{backgroundColor: "#1fb58f"}} value="Submit">Submit</Button>
            <br/><br/>
            <Button type="button" style= {{backgroundColor: "#eab126"}} onClick={this.fetchRegister}>Register</Button> 
            
          </div>
        </Form>
      )
    }
  }
}

export default Login;
