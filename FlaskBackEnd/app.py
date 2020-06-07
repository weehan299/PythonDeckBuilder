#!/usr/bin/env python
from flask import Flask, request, jsonify
from admin import firebase, db

# blueprint imports
from user.userRoute import user_blueprint
from create_deck.create_deck_blueprint import create_deck_blueprint


app = Flask(__name__)
app.config['DEBUG'] = True

app.register_blueprint(user_blueprint)
app.register_blueprint(create_deck_blueprint)


if __name__ == "__main__":
    app.run()
