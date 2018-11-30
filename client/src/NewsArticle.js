import React, { Component } from "react";
// import Articlelist from "./Articlelist";

class NewsArticle extends Component {
  constructor(props) {
    super(props)
        // initialize the state
        this.state = {
          news: []
        }
      }


    render(props) {
      return (
        <div>
        <b>{this.props.title}</b><br/>
        {this.props.description}<br/>
        <button href={this.props.url} target="_black"></button><br/>
        <img src={this.props.urlToImage} alt=""/>
        </div>
        );
    }
  }
  export default NewsArticle;



//
