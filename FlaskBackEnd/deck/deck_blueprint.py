import uuid
import datetime
import os
from flask import Blueprint, request, jsonify, redirect
from firebase_admin import firestore
from admin import db, bucket
from deck.anki import create_anki_deck_with_string_input

# used to authenticate user via cookies
from user.userAuth import UserAuthentication
user_auth = UserAuthentication()


deck_blueprint = Blueprint('deck_blueprint', __name__)


class Deck:
    """class to create anki decks"""
    def __init__(self, deck_name, created_by, created_at):
        self.deck_name = deck_name
        self.created_by = created_by
        self.created_at = created_at
        self.deck_id = str(uuid.uuid4())

    def to_dict(self):
        """used to return a dictionary format"""
        return self.__dict__

    def __repr__(self):
        return(
            f'Deck(deck_name={self.deck_name}, \
                created_by={self.created_by},\
                created_at={self.created_at})'
        )


@deck_blueprint.route('/createdeck', methods=['GET', 'POST'])
def create_deck():
    """create deck api"""
    if request.method == 'POST':
        user_details = user_auth.verify_and_decode_cookie()

        print(user_details.get('email'))
        if user_details is None:
            # if unable to verify cookie, go to login page.
            # need to redirect front end to login page not backend.
            response = jsonify(
                error="User not authenticated")
            response.status_code = 500
            return response

        # Get user info from form
        deck_input = request.json['input']
        deck_title = request.json['title']

        create_anki_deck_with_string_input(deck_title, deck_input)

        #  Deck class details added
        deck = Deck(deck_title, user_details.get('email'),
                    datetime.datetime.now().isoformat())

        # upload files to storage
        bucket.blob(f"{deck.deck_id}.apkg").upload_from_filename(
            f"{deck_title}.apkg")
        # remove deck from server
        os.remove(f"{deck_title}.apkg")
        # use this to print URL

        # add deck to database
        db.collection(u'Decks').document(deck.deck_id).set(deck.to_dict())

        # add deck's id to user
        print(user_details.get('email'))
        db.collection(u'Users').document(user_details.get('email')) \
            .update({u'deckId': firestore.ArrayUnion([deck.deck_id])})

        response = jsonify(
            status="Success")
        response.status_code = 200
        return response

    #TODO finish else portion of logic
    return "hello"


# this will be an AuthRoute in react
# dont use deck id to save in storage, can save using user/deckname. but
# need to authenticate user before letting them access.
# use manage session cookies to deal with login
# https://stackoverflow.com/questions/45181244/authentication-using-firebase-for-flask-application-running-in-appengine
@deck_blueprint.route('/deck/<deck_id>', methods=['GET', 'DELETE'])
def get_deck(deck_id):
    """get deck using their id"""
    user_details = user_auth.verify_and_decode_cookie()
    if user_details is None:
        # if unable to verify cookie, go to login page.
        return redirect('/login')

    doc = db.collection(u'Users').document(user_details.get('email')).get()
    deckid_array = doc.get('deckId')
    # check if deck_id is in user's document in firestore, to ascertain ownership.

    if request.method == 'GET':

        if deck_id in deckid_array:
            deck_blob = bucket.get_blob(f"{deck_id}.apkg")
            if deck_blob is not None:
                url = deck_blob.generate_signed_url(
                    version="v4", expiration=datetime.timedelta(minutes=15), method="GET")
                response = jsonify(status="Success", URL=url)
                return response
            else:
                response = jsonify(
                    status="Failed", message="Deck does not exist")
                response.status_code = 400
                return response
        else:
            response = jsonify(
                status="Failed", message="Deck is not yours")
            response.status_code = 400
            return response

    elif request.method == "DELETE":
        # if deck id is in user's deck, delete deck

        if deck_id in deckid_array:

            # delete deck document from deck collection
            db.collection(u'Decks').document(deck_id).delete()

            # update user's deckid array
            deckid_array.remove(deck_id)
            db.collection(u'Users').document(user_details.get('email')) \
                .update({u'deckId': deckid_array})

            # delete from storage
            bucket.get_blob(f"{deck_id}.apkg").delete()

            response = jsonify(
                status="Success", message=f"{deck_id}.apkg deleted")
            response.status_code = 200
            return response

        return 'deck does not exist'
