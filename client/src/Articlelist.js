import React, { Component } from "react";
import NewsArticle from "./NewsArticle";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

const API = "http://localhost:5000/filtered-news";
class Articlelist extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      articles: "Loading news "
    };
  }

  fetchNews(option) {
    console.log("article list fetched");
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({ "option": option })
    })
    .then(response => response.json())
    .then(data => this.setState({ articles: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
  }

  render(props) {
    if (this.state.articles && this.state.articles.length > 0) {
      let articleList = [];
      console.log(typeof articleList);
      for (let article of this.state.articles) {
        articleList.push(article);
      }

      return (
        <div>
        <button>LogOut</button>
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
        {articleList.map(article=><NewsArticle key={article.title} title={article.title} description={article.description} url={article.url} urlToImage={article.urlToImage}/>)}
        </div>
      );
    }
  }
}

    export default Articlelist;
