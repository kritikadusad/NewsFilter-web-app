import React, { Component } from "react";
import {logInForm, registerButton, logInButton} from "./styles";

import Articlelist from "./Articlelist";
import Register from "./Register";
import {Button, Form, Input, Label, FormGroup, Row, Col} from 'reactstrap';

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
          message = "Please login to read filtered news...";
        }
        else if (this.state.status === "successfully added"){
          message = "Successfully registered. You can login now..."
        }
        else {
          message = "Incorrect details.";
        }

      return(
        <div style={logInForm}>
        <Form className = "text-center mx-auto.col-sm-8.col-md-5.hide-sm" 
        onSubmit={this.handleSubmit}>
          <Row className = "text-center">
          <Col className=".col-sm-12 .col-md-6 .offset-md-3">
            <h2 className="mt-3 h3 mb-3 font-weight-normal"> {message} </h2>
            </Col>
          </Row>
            <FormGroup>
              <Label>
        
                <Input 
                  type="email" 
                  placeholder = "Email address"
                  name="email"
                  value = {this.state.email}
                  onChange = {this.handleEmailChange}
                  required
                  
                />
              </Label>
              </FormGroup>
            
            <FormGroup>
              <Label>
                <Input 
                type="password"
                
                placeholder = "Password" 
                name="password" 
                value = {this.state.password} 
                onChange = {this.handlePasswordChange} 
                required
                />
              </Label>
              <br/>
              </FormGroup>
              <Button type="submit" style={logInButton}
              value="Submit">Submit</Button>
            <br/><br/>

            <Button type="button" style={registerButton} onClick={this.fetchRegister}>Register</Button> 
        </Form>
        </div>
      )
    }
  }
}

export default Login;
