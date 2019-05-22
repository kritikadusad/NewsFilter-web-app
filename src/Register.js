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
  this.handleEmailChange = this.handleEmailChange.bind(this);
  this.handlePasswordChange = this.handlePasswordChange.bind(this);
  this.handleTriggerChange = this.handleTriggerChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
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
        <div>
          <div className="login-background-image"></div>
          <div className="register-content">
            <div className = "row">
              <div class="col-md-2"></div>
              
              <div className = "col-md-4 register-message">
              <h1>NewsFilter</h1>
                <h5>Makes reading news a pleasant experience. 
                            <br/>You can set your preferences
                            and tag unwanted <br/> news articles.</h5>
              </div>

              <div className="col-md-1"></div>
              
              <div className="card col-md-3 register-card">
                <div className="card-body">
                  <form className="form-signin form-register" onSubmit={this.handleSubmit}>
                    <h4 className="mb-3 font-weight-normal text-center">{message}</h4>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="Email address" required autofocus/>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                    <label for="inputTriggers" className="sr-only">Triggers</label>
                    <input type="triggers" value={this.state.triggers} onChange={this.handleTriggerChange} className="form-control" placeholder="Triggers" required/>
                    <button className="btn btn-lg btn-block nf-btn" type="submit" value="Submit">Create Account</button>
                  </form>
                </div>
              </div>

              <div className="col-md-2"></div>
            </div>

          </div>
        </div>
      )
    }
  }
}

export default Register;
