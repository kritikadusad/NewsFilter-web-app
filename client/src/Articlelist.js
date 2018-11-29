import React, { Component } from "react";
import NewsArticle from "./NewsArticle";

const API = "http://localhost:5000/filtered-news";
class Articlelist extends Component {
  constructor(props){
    super(props)
    // initialize the state
    this.state={
      articles: "init"
    }

  }
  componentDidMount() {
    console.log("article list");
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({"option": "world"})
    })
    .then(response => response.json())
    .then(data => this.setState({ articles: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
  }

  render(props) {
    return (
      <div>
      <NewsArticle title={this.state.articles.title} content={this.state.articles.content} url={this.state.articles.url} urlToImage={this.state.articles.urlToImage} />
      </div>
      );
    }
  }

  export default Articlelist;
