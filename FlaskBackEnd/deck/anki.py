import genanki
from deck.parser import parse_file_object, parse_string_input
#for generating model id
import random

my_model = genanki.Model(
    random.randrange(1 << 30, 1 << 31),
    'Simple Model',
    fields=[
        {'name': 'Question'},
        {'name': 'Answer'},
    ],
    templates=[
        {
            'name': 'Card 1',
            'qfmt': '{{Question}}',
            'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
        },
    ],
    css='.card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\n background-color: white;\n}\n.box {\n display:inline-block;\nborder:2px solid black;\npadding:5px;\nfont-size:1.4em\n}\n\n.ipa {\nfont-size:0.7em;\ndisplay:block;\ncolor:blue;\npadding:0 0 5px 0px;\n}\n\n.container {\nborder:0px solid;\ndisplay:table;\nmargin:auto;\n}\n\n.or {\ndisplay:table-cell;\nvertical-align:middle;\npadding:0 10px\n}\n.translation {\nfont-size:0.6em;\ndisplay:block;\ncolor:gray;\n}\n'
)



def create_anki_deck_with_string_input(str_title, str_input):
    dictionary = parse_string_input(str_input)

    my_deck = genanki.Deck(
        random.randrange(1 << 30, 1 << 31),
        f'{str_title}')

    for key,value in dictionary.items():
        answer_string = ""
        for i in value:
            answer_string += i.replace('\n', '<br />')
        my_deck.add_note(
            genanki.Note(
                model=my_model,
                fields=[key, answer_string]
            )
        )
    genanki.Package(my_deck).write_to_file(f'{str_title}.apkg')


def create_anki_deck_with_file(filename):

    # this will show the deck title and deck id
    my_deck = genanki.Deck(
        random.randrange(1 << 30, 1 << 31),
        'Testing Deck')

    file_object = open(filename, 'r')
    dictionary = parse_file_object(file_object)

    # Note contains a fact to memorise, whcih corresponds to one or more cards.
    # Fields are information within the card. can put either fields as question or ans.
    for key,value in dictionary.items():
        answer_string = ""
        for i in value:
            answer_string += i.replace('\n', '<br />')
        my_deck.add_note(
            genanki.Note(
                model=my_model,
                fields=[key, answer_string]
            )
        )
    genanki.Package(my_deck).write_to_file('testingDeck.apkg')

