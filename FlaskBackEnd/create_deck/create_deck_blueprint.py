from flask import Blueprint, request, jsonify, send_file
from create_deck.anki import create_anki_deck_with_string_input
import json
import uuid
from datetime import datetime
from admin import db, storage

create_deck_blueprint = Blueprint('create_deck_blueprint', __name__)

class Deck:
    def __init__(self, deck_name, created_by, created_at):
        self.deck_name = deck_name
        self.created_by = created_by
        self.created_at = created_at
        self.deck_id = str(uuid.uuid4())
        self.deck_url = ""
    
    def to_dict(self):
        return self.__dict__
    
    
    def __repr__(self):
        return(
            f'Deck(deck_name={self.deck_name}, created_by={self.created_by},\
                created_at={self.created_at})'
        )
        

@create_deck_blueprint.route('/createdeck', methods=['POST','GET'])
def create_deck():
    if request.method == 'POST':
        deck_input = request.form['input']
        deck_title = request.form['title']

        create_anki_deck_with_string_input(deck_title, deck_input)

        #TODO: change wee han to user's email. find a way to accesss user email
        deck = Deck(deck_title, "wee han", datetime.now().isoformat())
        
        storage.child(f"{deck.created_by}/{deck.deck_id}.apkg").put(f"{deck.deck_name}.apkg")
        deck.deck_url = storage.child(f"{deck.created_by}/{deck.deck_id}.apkg").get_url("")

        db.collection(u'Decks').document(deck.deck_id).set(deck.to_dict())
        return 'deck created'


@create_deck_blueprint.route('/deck/<deck_id>', methods=['GET'])
def get_deck(deck_id):
    deck = db.collection(u'Decks').document(deck_id).get()
    name = deck.get("created_by")
    #print(deck._data)
    storage.child(f"{name}/{deck_id}.apkg").download("test.apkg")
    return "hello"

        