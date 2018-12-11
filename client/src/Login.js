import React, { Component } from "react";
import Articlelist from "./Articlelist";
import Register from "./Register";
import {Route, Link, BrowserRouter} from "react-router-dom";

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
          message = "Please sign in";
        }
        else if (this.state.status === "successfully added"){
          message = "Successfully registered, please sign in"
        }
        else {
          message = "Incorrect details";
        }

      return(
        <div>
            <div className="login-background-image"></div>
            <div className="login-content">
                    <div className="row">
                        <div class="col-md-2"></div>

                        <div className="col-md-4 login-message">
                            <h1>NewsFilter</h1>
                            <h5>Makes reading news a pleasant experience. 
                            <br/>You can set your preferences
                            and tag unwanted <br/> news articles.</h5>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="card col-md-3 login-card">
                          <div className="card-body">

                              <form className="form-signin" onSubmit={this.handleSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal text-center">{message}</h1>
                                <label for="inputEmail" className="sr-only">Email address</label>
                                <input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" placeholder="Email address" required autofocus/>
                                <label for="inputPassword" className="sr-only">Password</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required/>
                                <button className="btn btn-lg btn-block nf-btn" type="submit" value="Submit">Sign in</button>

                                <BrowserRouter>
                                  <p className="mt-5 mb-3 text-center">
                                    <Route path="/register" />
                                    <Link to="/register" onClick={() => {this.setState({status: "register"});}}>
                                      Create new account
                                    </Link>
                                  </p>
                                </BrowserRouter>
                              </form>

                            <footer className="mt-5 mb-3 text-muted text-center">Powered by <a href="http://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI</a></footer>
                          </div>
                        </div>

                        <div className="col-md-2">
                        </div>
                    </div>

            </div>
        </div>
      )
    }
  }
}

export default Login;
