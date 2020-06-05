from flask import request, jsonify
from admin import firebase, db
import requests
import json
import firebase_admin

#handled error all within user authentication. Maybe not the best way to do it.
#Maybe better to create an exception and pass all error through it. 

class UserAuthentication: 
    def __init__(self):
        self.auth = firebase.auth()

    def user_signup(self, firstName, lastName, email, password, confirmPassword):
        try:
            #validate password confirm password
            if password == confirmPassword:
                new_user = self.auth.create_user_with_email_and_password(email, password)
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


    def user_login(self, email, password):
        try: 
            user = self.auth.sign_in_with_email_and_password(email, password)
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



