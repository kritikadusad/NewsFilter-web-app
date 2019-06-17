""" Models and database functions for project db """

from flask import Flask
from flask_heroku import Heroku
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import date

db = SQLAlchemy(app)


class User(db.Model):
    """ User's details like username, password and triggering workds"""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(50), nullable=True)
    password = db.Column(db.Binary, nullable=True)
    trig = db.Column(ARRAY(db.String(100)), nullable=False)

    def __repr__(self):
        """Provide useful output when printing."""

        return "<User {} user_id={} triggers={}>".format(username=self.email, user_id=self.user_id, trigger=self.trig)


class BannedNews(db.Model):
    """ News with news id. """

    __tablename__ = 'bannednews'

    news_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    trig_article = db.Column(db.String(200), nullable=False)
    trig_words = db.Column(db.String(100), nullable=False)
    date_added = db.Column(db.String(15), nullable=False)

    def __repr__(self):
        """Provide useful output when printing."""

        return f"<News_id={self.news_id} triggers={self.trig_words} date_added={self.trig_words}>"


# -------------------------------------------------------------------
# Helper functions


def init_app():
    # So that we can use Flask-SQLAlchemy, we'll make a Flask app.
    app = Flask(__name__)

    connect_to_db(app, uri='postgres:///filterednews')

    print("Connected to DB.")


def connect_to_db(app, uri='postgres:///filterednews'):
    """Connect the database to our Flask app."""

    # Configure to use our database.
    app.config['SQLALCHEMY_DATABASE_URI'] = uri
    app.config['SQLALCHEMY_ECHO'] = False
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app

    db.init_app(app)
    db.create_all()


if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    init_app()
