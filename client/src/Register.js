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
        message = "This email is already in use. Please try again.";
      }
      else {
        message = "Please register here.";
      }
      return(
        <div style={logInForm}>
          <Form onSubmit={this.handleSubmit}>
            <Row className = "text-center">
              <Col className=".col-sm-12 .col-md-6 .offset-md-3">
                <h2 className="mt-3 h3 mb-3 font-weight-normal"> {message} </h2>
              </Col>
            </Row>

            <FormGroup>
              <input 
                type="email" 
                name="email"
                placeholder = "Email"
                value = {this.state.email}
                onChange = {this.handleTheEmailChange}
                required/>
            </FormGroup>
            <FormGroup>
              <input 
                type="password" 
                name="password" 
                placeholder = "Password"
                value = {this.state.password} 
                onChange = {this.handlePasswordChange}
                required/>
                <br/>
            </FormGroup>

            <FormGroup>
              <input 
                type="text" 
                placeholder="Triggers"
                name="triggers" 
                value = {this.state.triggers} 
                onChange = {this.handleTriggerChange}
                required/>
              <br/>
            </FormGroup>
            <Button type="submit" value="Submit" style={registerButton} >Register</Button> 
            <br/><br/>
          </Form>
        </div>
      )
    }
  }
}

export default Register;
