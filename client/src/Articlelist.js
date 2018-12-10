import React, { Component } from "react";
import NewsArticle from "./NewsArticle";
import Login from "./Login";
import { Route,  NavLink, BrowserRouter} from "react-router-dom";

const API = "http://localhost:5000/filtered-news";
const logoutAPI = "http://localhost:5000/logout";
class Articlelist extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      status: "",
      articles: [],
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
  
  componentDidMount() {
    this.fetchNews("world");
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
    console.log(this.state);
    if (this.state.status === "logged out"){
      return (<Login/>)
    }
    else {
      let articleList = [];
      let articlesDiv = <div/>;
      if (this.state.articles && this.state.articles.length > 0) {
        console.log(typeof articleList);
        for (let article of this.state.articles) {
          articleList.push(article);
        }
        articlesDiv = 
          <div>
            {articleList.map(
              article=>
                <div className = "row">
                  <div className = "col-md-2" />
                  <div className = "col-md-8">
                    <NewsArticle key = {article.title} title = {article.title} description = {article.description}
                    url = {article.url} urlToImage = {article.urlToImage}/>
                  </div>
                  <div className = "col-md-2" />
                </div>
              )
            }  
          </div>;
      }

      return (
        <span>
            <BrowserRouter>
            <div>
            <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNewsFilter" aria-controls="navbarNewsFilter" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNewsFilter">
                <a href="/" className="navbar-brand">NewsFilter</a>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item active">
                    <NavLink className="nav-link" to="/newsarticle" onClick={()=>{
                      this.fetchNews("world")}
                    }>
                    World
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/newsarticle" onClick={()=>{
                      this.fetchNews("technology")}
                    }>
                    Technology
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/newsarticle" onClick={()=>{
                      this.fetchNews("politics")}
                    }>
                    Politics
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/newsarticle" onClick={()=>{
                      this.fetchNews("sports")}
                    }>
                    Sports
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/newsarticle" onClick={()=>{
                      this.fetchNews("guardian")}
                    }>
                    The Guardian
                    </NavLink>
                  </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                  <button className="btn btn-success my-2 my-sm-0" onClick={this.logOut}>Log Out</button>
                </form>
              </div>
            </header>

            <main role="main">
              <div className = "content">
                <Route path="/newsarticle"/>
              </div>
            </main>

            </div>
            </BrowserRouter>

            <div className="article-container">
              {articlesDiv}
            </div>

          </span>
      );
    }
  }
}

export default Articlelist;
