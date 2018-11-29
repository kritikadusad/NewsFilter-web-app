import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Articlelist from "./Articlelist";
import Technology from "./Technology";

// const API = "http://localhost:5000/filtered-news";


class News extends Component {
  // constructor(props){
  //   super(props)
  // }



  render() {

    return(
      <HashRouter>
      <div>
      <h1>News Options</h1>
      <ul className="header">
      <li><NavLink to="/home">Home</NavLink></li>
      <li><NavLink to="/articlelist">World</NavLink>
      </li>
      <li><NavLink to="/technology">Technology</NavLink></li>
      </ul>
      <div className="content">
      <Route exact path="/home" component={Home}/>
      <Route path="/articlelist" component={Articlelist}/>
      <Route path="/technology" component={Technology}/>
      </div>
      </div>
      </HashRouter>
      );
  }
}

export default News;
