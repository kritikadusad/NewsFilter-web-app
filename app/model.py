""" Models and database functions for project db """

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import ARRAY
import datetime as dt

db = SQLAlchemy()


class User(db.Model):
    """ User's details like username, password and triggering workds"""

    __tablename__ = 'users'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email = db.Column(db.String(50), nullable=True)
    password = db.Column(db.Binary, nullable=True)
    triggers = db.Column(ARRAY(db.String(100)), nullable=False)

    def __repr__(self):
        """Provide useful output when printing."""

        return "<User {} triggers={}>".format(self.user_id, self.trig)


class BannedNews(db.Model):
    """ News with news id. """

    __tablename__ = 'bannednews'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    article = db.Column(db.String(200), nullable=False)
    triggers = db.Column(db.String(100), nullable=False)
    created = db.Column(db.DateTime, default=dt.datetime.utcnow)

    def __repr__(self):
        """Provide useful output when printing."""

        return f"<News_id={self.news_id} triggers={self.trig_words}, {self.created}>"


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
