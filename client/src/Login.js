import React, { Component } from "react";

const API = "http://localhost:5000/logged-in";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log("Sending request to server");
        fetch(API, {
          method: 'POST',
          body: JSON.stringify({ "email" : "hello@gmail.com", 
            "password": "hello"})
        })
        .then(response => response.json())
        .then(data => this.setState({ user: data }))
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          User ID:
          <input 
            type="email" 
            name="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
          />
        </label>
        <label>
          Password:
          <input 
          type="password" 
          name="password"
          value={this.state.password} 
          onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <div>
            <HashRouter>
            <div>
            <h1>News Options</h1>
            <ul className="header">
            <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("entertainment")}}>
            Entertainment
            </NavLink></li>
            <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("world")}}>
            World
            </NavLink></li>
            <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("technology")}}>
            Technology
            </NavLink></li>
            </ul>
            <div className="content">
            <Route exact path="/newsarticle" component={NewsArticle}/>
            <Route path="/newsarticle" component={NewsArticle}/>
            <Route path="/newsarticle" component={NewsArticle}/>
            </div>
            </div>
            </HashRouter>
    );
  }
}


    export default Login;
