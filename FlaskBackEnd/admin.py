""" config file"""

import firebase_admin
from firebase_admin import credentials, firestore, storage
import pyrebase

# Use a service account for firebase admin
cred = credentials.Certificate('key.json')
# used for loading storage
fb_app = firebase_admin.initialize_app(cred)


firebaseConfig = {
    "apiKey": "AIzaSyDd7ujqKTTMOHaXu8HQv8grTTNWahNEk10",
    "authDomain": "pythonankibuilder.firebaseapp.com",
    "databaseURL": "https://pythonankibuilder.firebaseio.com",
    "projectId": "pythonankibuilder",
    "storageBucket": "pythonankibuilder.appspot.com",
    "messagingSenderId": "1030165531055",
    "appId": "1:1030165531055:web:3a4a2680472fceed69075a",
    "measurementId": "G-BPF66JQ7QN",
    "serviceAccount": "key.json"
}

# Initialise firestore database and pyrebase
db = firestore.client()
bucket = storage.bucket(firebaseConfig["storageBucket"])
firebase = pyrebase.initialize_app(firebaseConfig)
# pyrebase's strorage
#storage = firebase.storage()

"""
# Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
"""
