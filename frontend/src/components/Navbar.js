import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//Link
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
}));

function isLoggedIn() {
    return localStorage.getItem("currentUser") != null ? true : false;
}

function logOut() {
    localStorage.removeItem("currentUser");
    localStorage.clear();


  axios
    .post("/logout")
    .then((res) => {
      console.log("successful logout", res);
      //window.location = "/";
      //a deprecated approach
      window.location.reload()
    })
    .catch((err) => {
      console.log("an err", err);
    });
}

export default function ButtonAppBar() {
    const classes = useStyles();

    let userLoggedIn = isLoggedIn();

    console.log("userlogin", userLoggedIn);


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            Anki Deck Builder
          </Typography>
          {userLoggedIn ? (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/createdeck">
                Create Deck
              </Button>
              <Button color="inherit" onClick={logOut} component={Link} to="/">
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign up
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
