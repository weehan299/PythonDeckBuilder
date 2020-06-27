"""API endpoint for user infos"""
import json
from flask import Blueprint, request, jsonify, redirect, make_response
from firebase_admin import firestore
from admin import db

from user.user_auth import UserAuthentication

user_blueprint = Blueprint('user_blueprint', __name__)

user_authentication = UserAuthentication()


@user_blueprint.route('/login', methods=['GET', 'POST'])
def login():
    """login user"""
    if request.method == 'POST':
        email = request.json['email']
        password = request.json['password']
        return user_authentication.user_login(email, password)
    return jsonify(general="Something went wrong")


@user_blueprint.route('/signup', methods=['POST'])
def signup():
    """user sign up"""
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    email = request.json['email']
    password = request.json['password']
    confirm_password = request.json['confirmPassword']
    return user_authentication.user_signup(first_name, last_name, email, password, confirm_password)


@user_blueprint.route('/logout', methods=['GET'])
def session_logout():
    """user logout"""
    response = make_response(redirect('/login'))
    response = jsonify(status="success", message="logout successful")
    response.set_cookie('session', expires=0)
    return response


@user_blueprint.route('/profile', methods=['GET'])
def view_profile():
    """get user profile"""
    user_details = user_authentication.verify_and_decode_cookie()

    if user_details is None:
        # if unable to verify cookie, go to login page.
        return jsonify("user not logged in")

    # get user's deck and order them by date created.
    # complex queries require indexing in firebase (which i already created)

    docs = db.collection(u'Decks').where(u'created_by', u'==', user_details.get('email')) \
        .order_by(u'created_at', direction=firestore.Query.DESCENDING)\
        .stream()

    x = user_details.get('email')
    
    doc_ref = db.collection(u'Users').document(x).get()
    first_name = doc_ref.get('firstName')

    deck_list = []

    for doc in docs:
        #print(f'{doc.id} => {doc.to_dict()} \n')
        deck_list.append(doc.to_dict())
    decks_in_json = json.dumps(deck_list) 
    return jsonify( \
            first_name=first_name, \
            email=user_details.get('email'),\
            profile=decks_in_json)
