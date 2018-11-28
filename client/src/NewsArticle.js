import React, { Component } from "react";


class NewsArticle extends Component {
  constructor(){
    super()
// initialize the state
this.state={
  news: []
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
    <span> {props.name} </span>
    </div>
    );
}
}

export default NewsArticle;
