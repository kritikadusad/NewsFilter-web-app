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
