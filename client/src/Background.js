import React, { Component } from "react";

class Background extends Component {
    constructor(props){
        super(props);
        this.state = {
            titles: []
        };
    }

componentDidMount() {

    fetch("http://localhost:5000/filtered-news" {
      method: 'POST',
      body: JSON.stringify({"option": "world"}),
    })
    .then(results => {
        return results.json();
    })
    .then(data =>{
        let titles = data.articles.map(title) =>{
            return (
                <div key={title.articles}>
                    {title.title}
                </div>
            )

        })
    this.setState({titles: titles});
    console.log("state", this.state.titles);
    })




    render() {
        return(
            <div>
                {this.state.titles}
            </div>
            )
    }
}
