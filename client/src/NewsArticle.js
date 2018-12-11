import React, { Component } from "react";

const TRIGGER_UPDATE_API = "http://localhost:5000/trigger-update";

class NewsArticle extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      status: "good",
      title: this.props.title,
      trigger_words: "",
    };
    
    this.handleTriggerWordChange = this.handleTriggerWordChange.bind(this);
    this.handleTriggerSubmit = this.handleTriggerSubmit.bind(this);
  }

  handleTriggerWordChange(event) {
    this.setState({
                  trigger_words: event.target.value
                  });
  }

  handleTriggerSubmit(event) {
    event.preventDefault();
    console.log("Sending trigger update to server article: " + this.state.title + " words:" + this.state.trigger_words);
    fetch(TRIGGER_UPDATE_API, {
      method: 'POST',
      body: JSON.stringify({"trigger_article": this.state.title, 
        "trigger_words": this.state.trigger_words})
    })
    .then(response => this.setState({ status: "bad" }));
    console.log("Done trigger update");  
  }

  render() {
    if (this.state.status === "bad") {
      return <div/>
    }

    return (
      <div className = "card flex-md-row mt-4 h-md-250 bg-light">
        <div className = "col-md-9">
          <div className = "card-body d-flex flex-column align-items-start">
            <h4 className="mb-0">
              <a href = {this.props.url} target = "_black" className = "text-dark">{this.props.title}</a>
            </h4>
            <p className = "card-text">{this.props.description}</p>
            <div className = "btn-group">
              <button type="button" class="btn btn-sm dropdown-toggle nf-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               
              </button>
              <div class="dropdown-menu">
                <form class="form-inline dropdown-item" onSubmit={this.handleTriggerSubmit}>
                  <label class="sr-only" for="inlineFormInputName2">Name</label>
                  <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" onChange = {this.handleTriggerWordChange} value = {this.state.trigger_words} placeholder="Trigger topics"/>
                  <button type="submit" class="btn btn-sm mb-2 nf-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className = "col-md-3 mt-4 mb-4">
          <img className = "card-img-right flex-auto d-none d-md-block p-1 mx-auto" src = {this.props.urlToImage} alt = ""/>
        </div>
      </div> 
    );
  }
}
  export default NewsArticle;
