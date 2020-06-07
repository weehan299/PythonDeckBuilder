from flask import Blueprint, request, jsonify, send_file
from create_deck.anki import create_anki_deck_with_string_input

create_deck_blueprint = Blueprint('create_deck_blueprint', __name__)


@create_deck_blueprint.route('/createdeck', methods=['POST','GET'])
def create_deck():
    if request.method == 'POST':
        deck_input = request.form['input']
        deck_title = request.form['title']
        #generate_deck(deck_name, deck_input)
        deck = create_anki_deck_with_string_input(deck_title, deck_input)
        return 'deck created'
        