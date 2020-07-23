import React from 'react';
import axios from "axios";

function Logout() {
    localStorage.removeItem("authenticated");
    localStorage.clear();
    
        console.log("logging out");
        axios
			/*
            .get("https://pythondeckbuilder.herokuapp.com/logout", {
                withCredentials: true
            })
			*/
			.get("/logout")
            .then(res => {
                console.log("successful logout", res);
                window.location = "#/login";
                window.location.reload(false);
            })
            .catch(err => {
                console.log("an err", err);
            });
    return (
        <div>
        </div>
    );
};

export default Logout;