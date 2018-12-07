import React, { Component } from "react";
import NewsArticle from "./NewsArticle";
import Login from "./Login";
import Empty from "./Empty";
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
    if (this.state.status === "logged out"){
      return (<Login/>)
    }
    else {
      let articleList = [];
      if (this.state.articles && this.state.articles.length > 0) {
        console.log(typeof articleList);
        for (let article of this.state.articles) {
          articleList.push(article);
          console.log(article);
        }
      }

      return (
        <span>
          
            <BrowserRouter>
            <div>
              <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <a className="navbar-brand">NewsFilter</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav header" >
                    <li className="nav-item">
                      <NavLink className="nav-link active" to="/empty">
                      Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link active" to="/newsarticle" onClick={()=>{
                        this.fetchNews("world")}
                      }>
                      World
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/newsarticle" onClick={()=>{this.fetchNews("technology")}}>
                        Technology
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/newsarticle" onClick={()=>{this.fetchNews("politics")}}>
                        Politics
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/newsarticle" onClick={()=>{this.fetchNews("sports")}}>
                        Sports
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/newsarticle" onClick={()=>{this.fetchNews("guardian")}}>
                        The Guardian
                      </NavLink>
                    </li>
                             
                  </ul>
                  <button className="btn btn-outline-success" onClick={this.logOut} type="button">
                    Log Out
                  </button>
                  </div>
                </nav>
                <main role="main">
                  <div className = "content">
                    <Route path="/newsarticle" component={NewsArticle} />
                  </div>
                </main>
                </div>
                </BrowserRouter>
              <div className = "row">
                {articleList.map(article=>
                  <div className= "col-sm-4">
                    <NewsArticle key = {article.title} title = {article.title} description = {article.description}
                    url = {article.url} urlToImage = {article.urlToImage}/>
                  </div>)}  
              </div>

          </span>
      );
    }
  }
}

export default Articlelist;
