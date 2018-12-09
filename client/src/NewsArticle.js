import React, { Component } from "react";
// import Articlelist from "./Articlelist";
// TAGAPI = "http://localhost:5000/trig-submitted";
class NewsArticle extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      news: []
    };
    console.log(props);
  }

  render() {
    
    console.log(this.props);
    return (
      <div className = "card flex-md-row mt-4 box-shadow h-md-250">
        <div className = "col-md-9">
          <div className = "card-body d-flex flex-column align-items-start">
            <h4 className="mb-0">
              <a href = {this.props.url} target = "_black" className = "text-dark">{this.props.title}</a>
            </h4>
            <p className = "card-text">{this.props.description}</p>
          </div>
        </div>
        <div className = "col-md-3 mt-4 mb-4">
          <img className = "card-img-right flex-auto d-none d-md-block p-1 mx-auto" src = {this.props.urlToImage} alt = "Card image cap"/>
        </div>
      </div> 
    );
  }
}
  export default NewsArticle;
