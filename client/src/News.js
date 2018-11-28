import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import World from "./World";
import Technology from "./Technology";

const API = "http://localhost:5000/filtered-news";


class News extends Component {
  constructor(props){
    super(props)
  // initialize the state
  this.state={
    news: "init"
  }
}

componentDidMount(option) {
  console.log("componentDidMount");
  fetch(API, {
    method: 'POST',
    body: JSON.stringify({"option": option}),
  })
  .then(response => response.json())
  .then(json => JSON.stringify(json))
  .then(json_str => this.setState({news: json_str}))


  .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
}

render() {

  return(
    <HashRouter>
    <div>
    <h1>News Options</h1>
    <ul className="header">
    <li><button to="/home">Home</button></li>
    <li><button to="/world" onClick={
      () => this.componentDidMount('world')
    }>World
    </button>
    </li>
    <li><button to="/technology">Technology</button></li>
    </ul>
    <div className="content">
    <Route exact path="/home" component={Home}/>
    <Route path="/world" render={(news) => (
      {World}, news = this.state.news
      )
  }/>
  <Route path="/technology" component={Technology}/>
  </div>
  </div>
  </HashRouter>
  );
}
}

export default News;
