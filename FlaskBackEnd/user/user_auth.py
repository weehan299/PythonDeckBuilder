"""authenticate user"""
import json
from datetime import datetime, timedelta
import requests
from flask import request, jsonify
from firebase_admin import auth
import firebase_admin

from admin import firebase, db

# handled error all within user authentication. Maybe not the best way to do it.
# Maybe better to create an exception and pass all error through it.

class UserAuthentication:
    """Class containing functions to authenticate users."""

    def __init__(self):
        self.auth = firebase.auth()

    def user_signup(self, first_name, last_name, email, password, confirm_password):
        """function to sign up user with fire base"""
        try:
            if first_name == "":
                response = jsonify(
                    first_name="Please fill in your first name")
                response.status_code = 400
                return response

            if last_name == "":
                response = jsonify(
                    last_name="Please fill in your last name")
                response.status_code = 400
                return response


            # validate password confirm password
            if password == confirm_password:
                new_user = self.auth.create_user_with_email_and_password(
                    email, password)
                # lowercased email so easier to query for document
                doc_ref = db.collection(u'Users').document(email.lower())
                doc_ref.set({
                    u'firstName': first_name,
                    u'lastName': last_name,
                    u'email': email,
                    u'createdAt': datetime.now().isoformat(),
                    u'deckId': [],
                    u'id': new_user['localId']
                })

                token = new_user.get('idToken')
                return self.change_token_for_cookie(token)
            if password != confirm_password:
                response = jsonify(
                    confirm_password="Please make sure your passwords match")
                response.status_code = 400
                return response
            
           

        except requests.exceptions.HTTPError as error:
            # these are pyrebase exceptions.
            # convert text into json and parse it
            error_json = error.args[1]
            error = json.loads(error_json)['error']['message']
            if error == "INVALID_EMAIL":
                response = jsonify(email="Invalid email")
                response.status_code = 400
                return response
            elif error == "EMAIL_EXISTS":
                response = jsonify(email="Email already used")
                response.status_code = 400
                return response
            else:
                response = jsonify(general=error)
                response.status_code = 500
                return response

    def user_login(self, email, password):
        """ log in user via firebase"""
        try:
            user = self.auth.sign_in_with_email_and_password(email, password)
            token = user.get('idToken')

            # verify and change token for cookie
            return self.change_token_for_cookie(token)

        except requests.exceptions.HTTPError as error:
            # convert text into json and parse it
            # need to find a way to pass error to front end.
            error_json = error.args[1]
            error = json.loads(error_json)['error']['message']
            if error == "INVALID_PASSWORD":
                # pass error back to front end
                response = jsonify(password="Wrong credentials")
                response.status_code = 400
                return response
            elif error == "INVALID_EMAIL":
                response = jsonify(email="Invalid email")
                response.status_code = 400
                return response
            else:
                response = jsonify(general="error")
                response.status_code = 500
                return response

    def change_token_for_cookie(self, id_token):
        """change token for a cookie"""
        #try:
        expires_in = timedelta(days=5)
        session_cookie = firebase_admin.auth.create_session_cookie(
            id_token, expires_in=expires_in)
        # maybe can change status success for something else.
        response = jsonify(status="success", token=id_token)
        expires = datetime.now() + expires_in
        response.set_cookie(
            'session', session_cookie, expires=expires, secure=True, samesite=None  # httponly=True, secure=True
        )
        print(response)
        return response

        #except:
            #return abort(401, "Failed to create a session cookie")

    def verify_and_decode_cookie(self):
        """verify cookie"""
        session_cookie = request.cookies.get('session')
        if not session_cookie:
            # Session cookie is unavailable.
            return None
        # Verify the session cookie. In this case an additional check is added to detect
        # if the user's Firebase session was revoked, user deleted/disabled, etc.
        try:
            decoded_claims = firebase_admin.auth.verify_session_cookie(
                session_cookie, check_revoked=True)
            # print(decoded_claims)
            return decoded_claims
        except firebase_admin.auth.InvalidSessionCookieError:
            # Session cookie is invalid, expired or revoked. Force user to login.
            return "invalid cookie"
