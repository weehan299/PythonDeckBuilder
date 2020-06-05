#!/usr/bin/env python3

from flask import Flask, request, jsonify
from admin import firebase, db

#blueprint imports
from user.userRoute import user_blueprint

app = Flask(__name__)
app.config['DEBUG'] = True

app.register_blueprint(user_blueprint)


if __name__ == "__main__":
    app.run()
