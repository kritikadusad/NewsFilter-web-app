import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Articlelist from "./Articlelist";


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
      <li><NavLink to="/articlelist">Entertainment</NavLink></li>
      <li><NavLink to="/articlelist">World</NavLink>
      </li>
      <li><NavLink to="/articlelist">Technology</NavLink></li>
      </ul>
      <div className="content">
      <Route path="/articlelist" render={(props) => <Articlelist {...props} newsOption={"entertainment"} />}
      />
      <Route path="/articlelist" render={(props) => <Articlelist {...props} newsOption={"world"} />}
      />
      <Route path="/articlelist" render={(props) => <Articlelist {...props} newsOption={"technology"}/>}
      />
      </div>
      </div>
      </HashRouter>
      );
  }
}

export default News;
