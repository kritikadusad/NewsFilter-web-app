import React, { Component } from "react";
import NewsArticle from "./NewsArticle";

const API = "http://localhost:5000/filtered-news";
class World extends Component {
  constructor(props){
    super(props)
// initialize the state
this.state={
  news: props.news
}
}
getUser = () => {
  fetch('/user.json')
  .then(response => response.json())
  .then(data => {
    const user_id = data.user_id
    return user_id
  });
}

render(props) {
  return  (
    <div>
    {props.news.map(c =>
      <NewsArticle key={c.key} name={c.author} />)}
    </div>
    );
}
}

export default World;
