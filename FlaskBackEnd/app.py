"""Main file to run with"""

# !/usr/bin/env python
from flask import Flask
from flask_cors import CORS

# blueprint imports
from user.user_route import user_blueprint
from deck.deck_blueprint import deck_blueprint

app = Flask(__name__)
app.config['DEBUG'] = True

CORS(app)


app.register_blueprint(user_blueprint)
app.register_blueprint(deck_blueprint)

if __name__ == "__main__":
    app.run(threaded=True)
