from flask import Flask, request, jsonify
import requests
import json
import firebase_admin
from datetime import datetime
#from firebase_admin import auth

from admin import firebase, db

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def index():
    return "hello"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email= request.json['email']
        password= request.json['password']
        return user_login(email, password)
    else:
        return 'Login Page'

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        firstName = request.json['firstName']
        lastName = request.json['lastName']
        email= request.json['email']
        password= request.json['password']
        confirmPassword= request.json['confirmPassword']
        return user_signup(firstName, lastName, email, password, confirmPassword)
    else:
        return 'Sign up Page'


auth = firebase.auth()


def user_signup(firstName, lastName, email, password, confirmPassword):
    try:
        #validate password confirm password
        if password == confirmPassword:
            new_user = auth.create_user_with_email_and_password(email, password)
            doc_ref = db.collection(u'Users').document(email)
            doc_ref.set({
                u'firstName': firstName,
                u'lastName': lastName,
                u'email': email,
                u'createdAt': datetime.now().isoformat(),
                u'id': new_user['localId']
            })
            return jsonify(token = new_user.get('idToken'))
        else:
            response = jsonify(confirmPassword = "Please make sure your passwords match")
            response.status_code = 400
            return response

    except requests.exceptions.HTTPError as e:
        #convert text into json and parse it
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_EMAIL":
            response = jsonify(email = "Invalid email")
            response.status_code = 400
            return response
        elif error == "EMAIL_EXISTS":
            response = jsonify(email = "Email already used")
            response.status_code = 400
            return response
        else: 
            response = jsonify(general = error)
            response.status_code = 500
            return response


def user_login(email, password):
    try: 
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify(token = user.get('idToken'))
    except requests.exceptions.HTTPError as e: 
        #convert text into json and parse it
        #need to find a way to pass error to front end. 
        error_json = e.args[1]
        error = json.loads(error_json)['error']['message']
        if error == "INVALID_PASSWORD":
            # pass error back to front end
            response = jsonify(password = "Wrong credentials")
            response.status_code = 400
            return response
        elif error == "INVALID_EMAIL":
            response = jsonify(email = "Invalid email")
            response.status_code = 400
            return response
        else:
            response = jsonify(general = "error")
            response.status_code = 500
            return response



if __name__ == "__main__":
    app.run()
