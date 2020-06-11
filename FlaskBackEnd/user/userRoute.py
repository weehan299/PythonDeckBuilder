from flask import Blueprint, request, jsonify, abort, redirect, make_response
import datetime
from admin import db
from firebase_admin import auth, firestore
import json

from user.userAuth import UserAuthentication

user_blueprint = Blueprint('user_blueprint', __name__)

user_auth = UserAuthentication()


@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        return user_auth.user_login(email, password)
    else:
        return 'Login Page'


@user_blueprint.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        firstName = request.json['firstName']
        lastName = request.json['lastName']
        email = request.json['email']
        password = request.json['password']
        confirmPassword = request.json['confirmPassword']
        return user_auth.user_signup(firstName, lastName, email, password, confirmPassword)
    else:
        return 'Sign up Page'


@user_blueprint.route('/logout', methods=['POST'])
def session_logout():
    response = make_response(redirect('/login'))
    response.set_cookie('session', expires=0)
    return response


# TODO: return a json list of deck info of the user.
@user_blueprint.route('/profile', methods=['GET'])
def view_profile():
    user_details = user_auth.verify_and_decode_cookie()

    if user_details == None:
        # if unable to verify cookie, go to login page.
        return redirect('/login')

    # get user's deck and order them by date created.
    # complex queries require indexing in firebase (which i already created)
    print(user_details.get('email'))
    docs = db.collection(u'Decks').where(u'created_by', u'==', user_details.get('email')) \
        .order_by(u'created_at', direction=firestore.Query.DESCENDING)\
        .stream()

    deck_list = []

    for doc in docs:
        #print(f'{doc.id} => {doc.to_dict()} \n')
        deck_list.append(doc.to_dict())

    decks_in_json = json.dumps(deck_list)
    return jsonify(decks_in_json)
