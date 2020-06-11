#!/usr/bin/env python
from flask import Flask, request, jsonify
from admin import firebase, db

# blueprint imports
from user.userRoute import user_blueprint
from deck.deck_blueprint import deck_blueprint


app = Flask(__name__)
app.config['DEBUG'] = True

app.register_blueprint(user_blueprint)
app.register_blueprint(deck_blueprint)


if __name__ == "__main__":
    app.run(threaded=True)
