"""Filtered News"""

from jinja2 import StrictUndefined
import os
from flask import (Flask, render_template, redirect,
                   request, flash, session, jsonify, json)
from flask_cors import CORS, cross_origin
from flask_debugtoolbar import DebugToolbarExtension

from model import User, BannedNews, connect_to_db, db

from newsapi import NewsApiClient

import requests

# For date_added column in the bannednews table.
from datetime import date
import bcrypt
from six import u
newsapi = NewsApiClient(api_key=os.environ.get('MY_KEY_NAME'))

app = Flask(__name__, template_folder="../client/public",
            static_folder="../client/src")
CORS(app)
# Required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"

# An undefined variable in Jinja2 will not fail silently:
app.jinja_env.undefined = StrictUndefined


@app.route('/register', methods=["POST"])
def register_form():
    """Registration form that takes email address, password and trigger words."""

    # Reg form is rendered when you go to page. When it is submitted, a
    # post request is made and if user's email is not in database then
    # it gets added and redirected to the homepage.

    data = request.data
    email = json.loads(data)["email"]
    # print("Email provided: ", email)
    password = json.loads(data)["password"]
    # print("Password provided: ", password)
    # Triggers are put into a list of strings.
    triggers = json.loads(data)["triggers"].split(", ")
    # print(triggers)

    # Checking to see if the email provided is in the database
    # already.
    email_in_db = User.query.filter_by(email=email).first()

    if email_in_db is None:
        # print(email_in_db)
        new_user = User(email=email,
                        password=hash_password(password),
                        trig=triggers)
        db.session.add(new_user)
        db.session.commit()
        # print(f"New user created {email}")
        return jsonify("successfully added")
    else:
        # print(f"User already registered {email}")
        return jsonify("user already registered.")


@app.route('/logged-in', methods=['POST'])
def logged_in():
    """Logged in or not"""

    # This is how react (front-end) sends info to this route.
    data = request.data
    email = json.loads(data)["email"]
    # print("Email provided: ", email)
    password = json.loads(data)["password"]
    # print("Password provided: ", password)

    # Checking to see if this email exists in the database.
    # Making a user object.
    email_in_db = User.query.filter(User.email == email).first()

    # Checking to see if the password matches for the email provided by the
    # user.
    if email_in_db:
        if bcrypt.checkpw(password.encode('utf8'), email_in_db.password):
            # If the check works for the email and matching password,
            # news options page is rendered. Otherwise, the login
            # page is rendered again.
            session['user'] = email

            # print("User id: ", user_id)
            # print("You have successfully logged in!")
            return jsonify("success")
        else:
            # print("Password incorrect.")
            return jsonify("Incorrect password")
    else:
        # print("Couldn't find the given email. ")
        return jsonify("Couldn't find your email. Please register")


@app.route("/logout")
def logout():
    """Logged out and session cleared."""
    data = request.data
    session.clear()
    return jsonify("logged out")


@app.route('/preferences-updated', methods=['POST'])
def update_preferences(user_id):
    """ Preferences for the user are updated in the database"""
    input_password = request.form.get("password")
    user = db.session.query(User).filter(User.user_id == user_id).one()
    if input_password:
        u_password = u(input_password)
        user_password = u_password.encode('utf8')
        hashed_password = bcrypt.hashpw(user_password, bcrypt.gensalt())
        # For updating a row entry in the table, I used the update method.
        user.query.update({"password": hashed_password})

    # # tr_words is a string.
    trig_words = request.form.getlist("trig_word")

    if trig_words:
        user.query.update({"trig": trig_words})

    db.session.commit()

    return render_template('preferences_updated.html', user_id=user_id)


@app.route('/filtered-news', methods=['POST'])
def userpreferences():
    """Gets user's preference of news and makes a query to get user's trigger words """
    # Below is a request to get the type of news the user has selected to read.
    data = request.data
    news_type = json.loads(data)["option"]
    logged_user = json.loads(data)["user_email"]
    # search = json.loads(data)["search"]
    print("User logged in is: ", logged_user)
    print("News option selected: ", news_type)
    # print("Search content:", search)
    # Making a user object to access trigger word for that user.
    user = User.query.filter_by(email=logged_user).first()

    trig_words = user.trig

    # Calling get_articles function that sends an API request.
    print((news_type, trig_words))

    # Main call to the API is below.
    filtered_articles = get_articles(news_type, trig_words)
    articles = []
    if filtered_articles:
        for article in filtered_articles:
            dict = {}
            dict["title"] = article["title"]
            dict["description"] = article["description"]
            dict["url"] = article["url"]
            dict["urlToImage"] = article["urlToImage"]
            articles.append(dict)

    # print("Headlines for today: ", news["filtered"])
    print("********************** RESPONSE SENT ", len(articles))
    return jsonify(articles)


def get_articles(news_type, trig_words):
    """ Sends a request to NewsAPI with user's trigger words and preference for type of news."""
    # Based on user's preference of news section, providing section news.
    news_options = {'world': 'bbc.co.uk',
                    'technology': 'techcrunch.com, theverge.com, hackernews.com',
                    'politics': 'politico.com',
                    'entertainment': 'ew.com',
                    'sports': 'espn.com',
                    'guardian': 'theguardian.com',
                    'nyt': 'nytimes.com',
                    'search': 'news.google.com'
                    }

    domains = news_options[news_type]
    print("Domain obtained: ", domains)

    trig_words_str = ''
    for trig_word in trig_words:
        trig_words_str += trig_word + ', '

    all_articles = newsapi.get_everything(q=f'-{trig_words_str}',
                                          domains=domains,
                                          from_param=f'{date.today()}',
                                          to=f'{date.today()}',
                                          language='en')

    # This is a list of articles objects from the json response returned.
    # print(all_articles)
    articles = all_articles['articles']
    return filtering_news(articles)


def filtering_news(articles):
    """ Make new list of filtered articles by removing articles from the bannednews table. """

    # Making a set of banned news titles.
    banned_news = BannedNews.query.all()
    banned_titles = set()
    for item in banned_news:
        banned_titles.add(item.trig_article)

    # Filtering news by selecting articles that do not have the triggering
    # title.
    if BannedNews:
        filtered_articles = []
        for article in articles:
            if article['title'] not in banned_titles:
                filtered_articles.append(article)
    else:
        filtered_articles = articles

    return filtered_articles


@app.route('/trigger-update', methods=['POST'])
def trig_tagging():
    """Adds the triggering article and trigger word associated with it to the db"""

    # Getting a list of news objects:
    trig_news = BannedNews.query.all()
    print(trig_news)

    data = request.data
    trig_article = json.loads(data)["trigger_article"]
    trig_words = json.loads(data)["trigger_words"]
    print("Trigger update article %s words %s" % (trig_article, trig_words))

    # Checking if triggering article is already in the database. If it isn't,
    # adding the article to the news table.
    if trig_article not in trig_news:
        new_trig_article = BannedNews(trig_article=trig_article,
                                      trig_words=trig_words,
                                      date_added=date.today())
        db.session.add(new_trig_article)

    db.session.commit()

    return "success"

# ------------------------------------------------------------------------------------------
# HELPER FUNCTIONS:
# ------------------------------------------------------------------------------------------


def hash_password(password):
    """ Given a string, hashes it using bcrypt"""
    # For password hashing
    u_password = u(password)
    encoded_password = u_password.encode('utf8')
    hashed_password = bcrypt.hashpw(encoded_password, bcrypt.gensalt())
    return hashed_password


if __name__ == "__main__":

    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    # make sure templates, etc. are not cached in debug mode
    app.jinja_env.auto_reload = app.debug

    connect_to_db(app, uri='postgres:///filterednews')

    # Use the DebugToolbar
    DebugToolbarExtension(app)

    app.run(port=5000)
