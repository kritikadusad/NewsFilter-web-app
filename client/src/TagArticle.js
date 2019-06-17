import React, { Component } from "react";
// import Articlelist from "./Articlelist";
TAGAPI = "http://localhost:5000/trig-submitted";
class TagArticle extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      news: []
    };
    console.log(props);
  }
  
  tagArticle(option) {
    console.log("article list fetched");
    fetch(TAGAPI, {
      method: "POST",
      body: JSON.stringify({ "option": option,
      "user_email": this.props.logged_user })
    })
    .then(response => response.json())
    .then(data => this.setState({ articles: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
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
                  <a href={this.props.url} target="_black" className="btn btn-primary" onClick = {()=>{this.tagArticle}}>Tag</a>
                </div>
              </div>
            </div>
          </div>
    );
  }
}
  export default TagArticle;
