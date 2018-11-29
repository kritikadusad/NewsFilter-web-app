import React, { Component } from "react";
import NewsArticle from "./NewsArticle";

const API = "http://localhost:5000/filtered-news";
class Articlelist extends Component {
  constructor(props){
    super(props)
    // initialize the state
    this.state={
      articles: " "
    }

  }
  componentDidMount() {
    console.log("article list fetched");
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({"option": "world"})
    })
    .then(response => response.json())
    .then(data => this.setState({articles: data}))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
  }

  render(props) {
    if (this.state.articles && this.state.articles.length > 0) {
      let articleList = []
      console.log(typeof articleList)
      for (let article of this.state.articles){
        articleList.push(article)}
        return(
          <div>
          {articleList.map(article=><NewsArticle key={article.title}title={article.title} content={article.content} url={article.url} urlToImage={article.urlToImage}/>)}
          </div>
          );
      }

    }
  }

  export default Articlelist;
