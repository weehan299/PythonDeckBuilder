from flask import Blueprint, request, jsonify, abort, redirect, make_response
import datetime
from firebase_admin import auth

from user.userAuth import UserAuthentication

user_blueprint = Blueprint('user_blueprint', __name__)


user_auth = UserAuthentication()

@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email= request.json['email']
        password= request.json['password']
        return user_auth.user_login(email, password)
    else:
        return 'Login Page'

@user_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        firstName = request.json['firstName']
        lastName = request.json['lastName']
        email= request.json['email']
        password= request.json['password']
        confirmPassword= request.json['confirmPassword']
        return user_auth.user_signup(firstName, lastName, email, password, confirmPassword)
    else:
        return 'Sign up Page'

@user_blueprint.route('/logout', methods=['POST'])
def session_logout():
    response = make_response(redirect('/login'))
    # delete cookies
    response.set_cookie('session', expires=0)
    return response