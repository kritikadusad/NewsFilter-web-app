"""Filtered News"""
# Please note that the word trigger itself can elicit negative feelings. To address this,
# I have used only letter t
from jinja2 import StrictUndefined
import os
from flask import (Flask, render_template, redirect,
                   request, flash, session, jsonify, json)
from flask_cors import CORS, cross_origin
from flask_debugtoolbar import DebugToolbarExtension

from model import User, BannedNews, connect_to_db, db
from utils import get_articles, filtering_news

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


@app.route('/')
def catch_all(path):
    """Homepage."""
    # session.clear()
# Here, we are checking if the user is logged in (session has 'user' key)
    if 'user' in session:
        user = User.query.filter(User.email == session['user']).first()
        user_id = int(user.user_id)
        return render_template("log_in_homepage.html", user_id=user_id)
    else:
        return render_template("index.html", user_id=2)
        # return render_template("homepage.html")


@app.route('/api/register', methods=["POST"])
def register_form():
    """Registration form that takes email address, password and trigger words."""

    # Reg form is rendered when you go to page. When it is submitted, a
    # post request is made and if user's email is not in database then
    # it gets added and redirected to the homepage.

    data = request.json
    app.logger.debug('Request data: ', data)
    print("Request data: ", data)

    email = data.get("email")
    password = data.get("password")
    trigger = data.get("trigger")

    # Getting all
    user_list = db.session.query(User.email).all()
    if user_email not in user_list:
        new_user = User(email=user_email,
                        password=hashed_password,
                        trig=trig_words)
        db.session.add(new_user)
        db.session.commit()
        return jsonify("successfully added"), 200
    else:
        return jsonify("user already registered."), 403


@app.route('/api/logged-in', methods=['POST'])
def logged_in():
    """Logged in or not"""

    # This is how react (front-end) sends info to this route.
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Checking to see if this email exists in the database. Making a user object.
    user = User.query.filter(User.email == email).first()

    # Checking to see if the password matches for the email provided by the
    # user.
    if user:
        if bcrypt.checkpw(password.encode('utf8'), user.password):
            # If the check works for the email and matching password, news options page is rendered.
            # Otherwise, the login page is rendered again.
            # User id is saved in this variable.
            user_id = user.user_id
            session['user'] = user_id
            print("Session made:", session['user'])
            app.logger.debug(f"User logged in: {user_id}")

            flash("You have successfully logged in!")
            # 200 Success, OK
            return jsonify({'user': user_id}), 200
        else:
            # 403 Unpermitted (the server recognizes the user, but not the password)
            return jsonify("Incorrect password"), 403
    else:
        # 401 Unauthenticated (the server does not know who you are.)
        return jsonify("Couldn't find your email. Please register"), 401


@app.route('/logout')
def logout():
    """Logged out and session cleared."""
# This is how you clear a session. Very important when logging out.
    session.clear()
    flash("Logged out!")
    return redirect("/")


@app.route('/user-preferences')
def change_preferences(user_id):
    """ User can change preference og trigger words or password"""
    user = User.query.get(user_id)
    return render_template('user_preferences.html', user=user)


@app.route("/api/user.json")
def user_info():
    """Return information about user as JSON."""
    # user = User.query.filter(User.email == session["user"]).first()
    # user_json = {"user_id": user.user_id, "trig_words": user.trig}
    user_json = {"user_id": 2, "trig_words": "rape"}
    # return jsonify('hello')
    return jsonify(user_json)


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

    return render_template('preferences_updated.html', user=user)


@app.route('/api/filtered-news', methods=['POST'])
def userpreferences():
    """Gets user's preference of news and makes a query to get user's trigger words """
    # Below is a request to get the type of news the user has selected to read.
    data = request.json
    news_type = data.get("option")
    # user_id = json.loads(data)["userid"]
    print("News option selected: ", news_type)
    # print("User logged in:", user_id)
    # Making a user object to access trigger word for that user.
    user = User.query.get(2)

    trig_words = user.trig

    # Calling get_articles function that sends an API request.
    print(news_type, trig_words)

    # Main call to the API is below.
    filtered_articles = get_articles(news_type, trig_words)
    articles = []
    if filtered_articles:
        for article in filtered_articles:
            data = {}
            data["title"] = article["title"]
            data["description"] = article["description"]
            data["url"] = article["url"]
            data["urlToImage"] = article["urlToImage"]
            articles.append(data)

    # print("Headlines for today: ", news["filtered"])
    print("********************** RESPONSE SENT ", len(articles))
    return jsonify(articles), 200


@app.route('/trig-tagged-news/<user_id>', methods=['POST'])
def trig_tagging_news(user_id):
    """Gets the title of triggering article and returns a page with a list of
    triggering words that the user can choose from. """

    trig_article = request.form.get("trig_article")
    return render_template('triggered.html', trig_article=trig_article, user_id=user_id)


@app.route('/trig-submitted/<trig_article>/<user_id>', methods=['POST'])
def trig_tagging(trig_article, user_id):
    """Adds the triggering article and trigger word associated with it to the db"""

    # Getting a list of news objects:
    trig_news = BannedNews.query.all()

    # Checking if triggering article is already in the database. If it isn't,
    # adding the article to the news table.
    if trig_article not in trig_news:
        trig_words = request.form.get("trig_words")
        new_trig_article = BannedNews(trig_article=trig_article,
                                      trig_words=trig_words,
                                      date_added=date.today())
        db.session.add(new_trig_article)

    # Checking for items in trig_news, and deleting old banned news items. Not needed right now.
    # if trig_news:
    #     today = str(date.today())
    #     # Below, I am deleting rows that contain news articles from yesterday and before.
    #     old_news = BannedNews.query.filter(BannedNews.date_added != today).all()
    #     for item in old_news:
    #         db.session.delete(item)

    db.session.commit()

    return render_template('trigger_submitted.html', user=user)
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
