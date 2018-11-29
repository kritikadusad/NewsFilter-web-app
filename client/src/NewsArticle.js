import React, { Component } from "react";


class NewsArticle extends Component {
  constructor(props){
    super(props)
// initialize the state
this.state={
  news: []
}
}
// getUser = () => {
//   fetch('/user.json')
//   .then(response => response.json())
//   .then(data => {
//     const user_id = data.user_id
//     return user_id
//   });
// }




      // {this.props.urlToImage}<br/>


      render(props) {
        return  (
          <div>
          <b>{this.props.title}</b><br/>
          {this.props.content}<br/>
          {this.props.url}<br/>
          {this.props.urlToImage}<br/>
          </div>
          );
      }
    }

    export default NewsArticle;
