from flask import Blueprint, request, jsonify, send_file, redirect
from create_deck.anki import create_anki_deck_with_string_input
import json
import uuid
import datetime
import os
from firebase_admin import firestore
from admin import db, bucket
# used to authenticate user via cookies
from user.userAuth import UserAuthentication
user_auth = UserAuthentication()


create_deck_blueprint = Blueprint('create_deck_blueprint', __name__)


class Deck:
    def __init__(self, deck_name, created_by, created_at):
        self.deck_name = deck_name
        self.created_by = created_by
        self.created_at = created_at
        self.deck_id = str(uuid.uuid4())

    def to_dict(self):
        return self.__dict__

    def __repr__(self):
        return(
            f'Deck(deck_name={self.deck_name}, created_by={self.created_by},\
                created_at={self.created_at})'
        )


@create_deck_blueprint.route('/createdeck', methods=['POST', 'GET'])
def create_deck():
    if request.method == 'POST':
        user_details = user_auth.verify_and_decode_cookie()

        if user_details == None:
            # if unable to verify cookie, go to login page.
            return redirect('/login')

        # Get user info from form 
        deck_input = request.form['input']
        deck_title = request.form['title']

        create_anki_deck_with_string_input(deck_title, deck_input)

        #  Deck class details added
        deck = Deck(deck_title, user_details.get('email'),
                    datetime.datetime.now().isoformat())

        # upload files to storage
        bucket.blob(f"{deck.deck_id}.apkg").upload_from_filename(
            f"social psych deck.apkg")
        # remove deck from server
        os.remove(f"{deck_title}.apkg")
        # use this to print URL
        print(deck.deck_id)

        #add deck to database
        db.collection(u'Decks').document(deck.deck_id).set(deck.to_dict())

        #add deck's id to user
        db.collection(u'Users').document(user_details.get('email')) \
            .update({u'deckId': firestore.ArrayUnion([deck.deck_id])})

        return 'deck created'
    else:
        # TODO: login page
        return "hello"


# TODO: this will be an AuthRoute in react
# TODO: dont use deck id to save in storage, can save using user/deckname. but
# need to authenticate user before letting them access.
# TODO: use manage session cookies to deal with login
# https://stackoverflow.com/questions/45181244/authentication-using-firebase-for-flask-application-running-in-appengine
@create_deck_blueprint.route('/deck/<deck_id>', methods=['GET'])
def get_deck(deck_id):
    user_details = user_auth.verify_and_decode_cookie()

    if user_details == None:
        # if unable to verify cookie, go to login page.
        return redirect('/login')

    doc = db.collection(u'Users').document(user_details.get('email')).get()
    deckId_array = doc.get('deckId')
    #check if deck_id is in user's document in firestore, to ascertain ownership.

    if deck_id in deckId_array:
        deck_blob = bucket.get_blob(f"{deck_id}.apkg")
        if deck_blob != None:
            url = deck_blob.generate_signed_url(
                version="v4", expiration=datetime.timedelta(minutes=15), method="GET")
            print(url)
            return redirect(url)
        else:
            return "Sorry deck does not exist"
    else:
        return "sorry deck is not yours bitch"
