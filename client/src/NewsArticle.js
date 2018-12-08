import React, { Component } from "react";
// import Articlelist from "./Articlelist";

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
          <div>
            <img className="card-img-top" src={this.props.urlToImage} alt=""/>
            <div className="card-body">
              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text">{this.props.description}</p>
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-2 btn-group-sm" role="group" aria-label="First group">
                  <a href={this.props.url} target="_black" className="btn btn-primary">Read more</a>
                </div>
                <div className="btn-group mr-2 " role="group" aria-label="Third group">
                  <a href={this.props.url} target="_black" className="btn btn-primary">Tag</a>
                </div>
              </div>
            </div>
          </div>
    );
  }
}
  export default NewsArticle;
