  
  tagArticle(option) {
    console.log("article list fetched");
    fetch(API, {
      method: "POST",
      body: JSON.stringify({ "option": option,
      "user_email": this.props.logged_user })
    })
    .then(response => response.json())
    .then(data => this.setState({ articles: data }))
    .catch(err => console.log('There has been a problem with your fetch operation: ', err.message));
  }

// This is for only one article from the server:
<NewsArticle key={this.state.articles.title} title={this.state.articles.title} content={this.state.articles.content} url={this.state.articles.url} urlToImage={this.state.articles.urlToImage} />

// This is for multiple articles from server:

{this.state.articles.map(article => <NewsArticle key={article.title}
  title={article.title} content={article.content} url={article.url} urlToImage={article.urlToImage}/>)}


// This is for something else:
.then(json_parsed=>setState({ articles: json_parsed}))








// For parsing:
if (this.state.articles && this.state.articles.length > 0) {
  return(
    <div>
    {
      this.state.articles.map(items => <NewsArticle key={items.title} title={items.title}/>)
    }
    </div>);
}



{
  this.state.articles.map(items => <NewsArticle key={items.title} title={items.title}/>)
}



// With javascript before this:
{articleList.map(article => <NewsArticle key={article.title}
  title={article.title} content={article.content} url={article.url} urlToImage={article.urlToImage}/>)}







if (this.state.articles && this.state.articles.length > 0) {
  let articleList = []
  for (let article of this.state.articles){
  }




  for (let article of this.state.articles){
    console.log(article)




// This is how the articleList is sending every article to the NewsArticle component.
<div>
{articleList.map(article=><NewsArticle key={article.title}title={article.title} description={article.content} url={article.url} urlToImage={article.urlToImage}/>)}
</div>










// Event handlers for Register.js page

//Bindings: 
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTriggerChange = this.handleTriggerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);










// FormData from Login.js (handleSubmit function)
    const data = new FormData(event.target) 


        const { status, email, password } = this.state;


// @app.route("/")

@app.route('/')
def catch_all(path):
     """Homepage."""
      session.clear()
 Here, we are checking if the user is logged in (session has 'user' key)
     if 'user' in session:
         user = User.query.filter(User.email == session['user']).first()
        user_id = int(user.user_id)
         return render_template("log_in_homepage.html", user_id=user_id)
     else:
        return render_template("index.html", user_id=2)
        return render_template("homepage.html")



// 
<div>
          <b>{this.props.title}</b><br/>
          {this.props.description}<br/>
          <a href={this.props.url} target="_black"></a><br/>
          <img src={this.props.urlToImage} alt=""/>
        </div>
