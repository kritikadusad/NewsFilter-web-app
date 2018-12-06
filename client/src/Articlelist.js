import React, { Component } from "react";
import NewsArticle from "./NewsArticle";
import Login from "./Login";
import { Navbar, Jumbotron, Button, Nav, NavItem, eventKey } from 'react-bootstrap';
import {logInForm, registerButton, logInButton, navigationLink} from "./styles";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

const API = "http://localhost:5000/filtered-news";
const logoutAPI = "http://localhost:5000/logout";
class Articlelist extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      status: "",
      articles: "loading articles",
      logged_user: this.props.logged_user
    };
  this.logOut = this.logOut.bind(this);
  }


  logOut(event) {
    console.log("Logging out")
    fetch(logoutAPI)
    .then(response => response.json())
    .then(data => this.setState({ status: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
    }
  
  
  fetchNews(option) {
    console.log("article list fetched");
    fetch(API, {
      method: "POST",
      body: JSON.stringify({ "option": option,
      "user_email": this.props.logged_user })
    })
    .then(response => response.json())
    .then(data => this.setState({ articles: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
  }

  render(props) {
    if (this.state.status === "logged out"){
      return (<Login/>)
    }
    else {
      if (this.state.articles && this.state.articles.length > 0) {
        let articleList = [];
        console.log(typeof articleList);
        for (let article of this.state.articles) {
          articleList.push(article);
          console.log(articleList)
        }

        return (
                <div>
                  <Nav className = "navbar navbar-expand-lg navbar-light bg-light">
                  <HashRouter className={Nav}>
                  <NavLink to ="/newsarticle" onClick={()=>{this.fetchNews("entertainment")}}   className="NavItem eventKey={1}">
                      Entertainment
                  </NavLink>
                  </HashRouter>
            </Nav>
          <button onClick={this.logOut}>LogOut</button>
          <HashRouter>
          <div>
          <ul className="navigation grid grid-gutters large-grid-fit med-grid-fit small-grid-1of2">
          
          <li><NavLink style={navigationLink} to="/newsarticle" onClick={()=>{this.fetchNews("world")}}>
          World
          </NavLink></li>
          <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("technology")}}>
          Technology
          </NavLink></li>
          <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("politics")}}>
          Politics
          </NavLink></li>
          <li><NavLink to="/newsarticle" onClick={()=>{this.fetchNews("sports")}}>
          Sports
          </NavLink></li>
          </ul>
          <div className="content">
          <Route path="/newsarticle" component={NewsArticle}/>
          <Route path="/newsarticle" component={NewsArticle}/>
          <Route path="/newsarticle" component={NewsArticle}/>
          <Route path="/newsarticle" component={NewsArticle}/>
          <Route path="/newsarticle" component={NewsArticle}/>
          </div>
          </div>
          </HashRouter>
          {articleList.map(article=><NewsArticle key = {article.title} title = {article.title} description = {article.description} url = {article.url} urlToImage = {article.urlToImage}/>)}
            
          </div>
        );
      }
    }
  }
}

export default Articlelist;
