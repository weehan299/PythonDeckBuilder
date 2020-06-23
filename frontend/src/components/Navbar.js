import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
//Link
import { Link } from "react-router-dom";
import axios from "axios";

const styles = {
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
};

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: false
        };
    }

    componentDidMount() {
        this.isLoggedIn();
    }

    isLoggedIn = () => {
        if (localStorage.getItem("currentUser") != null) {
            this.setState({ userLoggedIn: true });
        } else {
            this.setState({ userLoggedIn: false });
        }
    };

    logOut = () => {
        localStorage.removeItem("currentUser");
        localStorage.clear();

        console.log("logging out");
        axios.get("/logout")
            .then(res => {
                console.log("successful logout", res);
                window.location = '/';
                this.setState({ userLoggedIn: false });
            })
            .catch(err => {
                console.log("an err", err);
            });
        
    };

    render() {
        const { classes } = this.props;
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
                        {this.state.userLoggedIn ? (
                            <React.Fragment>
                                <Button color="inherit" component={Link} to="/profile">
                                    Profile
                                </Button>
                                <Button color="inherit" component={Link} to="/createdeck">
                                    Create Deck
                                </Button>
                                <Button color="inherit" onClick={this.logOut} >
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
}

export default withStyles(styles)(Navbar);
