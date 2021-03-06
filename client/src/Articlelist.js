// @format
import React, {Component} from 'react';
import NewsArticle from './NewsArticle';
import Login from './Login';
import {Route, NavLink, BrowserRouter} from 'react-router-dom';
import nf_logo from './nf.png';

const API = 'http://localhost:5000/filtered-news';
const logoutAPI = 'http://localhost:5000/logout';
class Articlelist extends Component {
  constructor(props) {
    super(props);
    // initialize the state
    this.state = {
      status: '',
      articles: [],
      logged_user: this.props.logged_user,
      search: '',
    };
    //Bindings:
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  logOut(event) {
    console.log('Logging out');
    fetch(logoutAPI)
      .then(response => response.json())
      .then(data => this.setState({status: data}))
      .catch(err =>
        console.log(
          'There has been a problem with your fetch operation: ',
          err.message,
        ),
      );
  }

  componentDidMount() {
    this.fetchNews('world');
  }

  fetchNews(option) {
    console.log('article list fetched');
    fetch(API, {
      method: 'POST',
      body: JSON.stringify({
        option: option,
        user_email: this.props.logged_user,
        search: this.state.search,
      }),
    })
      .then(response => response.json())
      .then(data => this.setState({articles: data}))
      .catch(err =>
        console.log(
          'There has been a problem with your fetch operation: ',
          err.message,
        ),
      );
  }

  render(props) {
    console.log(this.state);
    if (this.state.status === 'logged out') {
      return <Login />;
    } else {
      let articleList = [];
      let articlesDiv = <div />;
      if (this.state.articles && this.state.articles.length > 0) {
        console.log(typeof articleList);
        for (let article of this.state.articles) {
          articleList.push(article);
        }
        articlesDiv = (
          <div>
            {articleList.map(article => (
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <NewsArticle
                    key={article.title}
                    title={article.title}
                    description={article.description}
                    url={article.url}
                    urlToImage={article.urlToImage}
                  />
                </div>
                <div className="col-md-2" />
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="article-body">
          <BrowserRouter>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNewsFilter"
                  aria-controls="navbarNewsFilter"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNewsFilter">
                  <img
                    src={nf_logo}
                    height="30"
                    hspace="5"
                    className="d-inline-block align-top"
                    alt=""
                  />
                  <a href="/" className="navbar-brand">
                    NewsFilter
                  </a>

                  <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('world');
                        }}>
                        World
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('technology');
                        }}>
                        Technology
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('politics');
                        }}>
                        Politics
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('sports');
                        }}>
                        Sports
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('guardian');
                        }}>
                        The Guardian
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/newsarticle"
                        onClick={() => {
                          this.fetchNews('nyt');
                        }}>
                        NY Times
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <form
                        className="form-inline dropdown-item"
                        onSubmit={() => {
                          this.fetchNews('google-news');
                        }}>
                        <label className="sr-only" for="inlineFormInputName2">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control mb-2 mr-sm-2"
                          id="inlineFormInputName2"
                          onChange={this.handleSearchChange}
                          value={this.state.search}
                          placeholder="Search content"
                        />
                        <button
                          type="submit"
                          className="btn btn-sm mb-2 nf-btn">
                          Submit
                        </button>
                      </form>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <button
                      className="btn my-2 my-sm-0 nf-btn"
                      onClick={this.logOut}>
                      Log Out
                    </button>
                  </form>
                </div>
              </nav>

              <main role="main">
                <div className="content">
                  <Route path="/newsarticle" />
                </div>
              </main>
            </div>
          </BrowserRouter>

          <div className="article-container">{articlesDiv}</div>
        </div>
      );
    }
  }
}

export default Articlelist;
