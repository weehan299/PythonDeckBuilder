"""API endpoint for user infos"""
import json
from flask import Blueprint, request, jsonify, redirect, make_response
from firebase_admin import firestore
from admin import db

from user.user_auth import UserAuthentication

user_blueprint = Blueprint('user_blueprint', __name__)

user_auth = UserAuthentication()


@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    """login user"""
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        return user_auth.user_login(email, password)
    return "Login page"


@user_blueprint.route('/signup', methods=['POST'])
def signup():
    """user sign up"""
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = request.json['password']
    confirm_password = request.json['confirmPassword']
    return user_auth.user_signup(first_name, last_name, email, password, confirm_password)


@user_blueprint.route('/logout', methods=['POST'])
def session_logout():
    """user logout"""
    response = make_response(redirect('/login'))
    response.set_cookie('session', expires=0)
    return response


@user_blueprint.route('/profile', methods=['GET'])
def view_profile():
    """get user profile"""
    user_details = user_auth.verify_and_decode_cookie()

    if user_details is None:
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
