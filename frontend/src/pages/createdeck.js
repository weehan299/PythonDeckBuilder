import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
// styling for profile
import { withStyles } from "@material-ui/core/styles";

//for pop up after deck is created.
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import axios from "axios";

const styles = {
    root: {
        //margin: "10px",
        //borderRadius: 3,
        border: 0,
        color: "black",
        height: 48,
        padding: "20px"
    },
    button: {
        textTransform: "none"
    },
    progress: {
        position: "absolute"
    },
    deckInput: {
        padding: " 0 0 20px 0"
    }
};

export class CreateDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            input: "",
            status: "",
            errors: {},
            loading: false,
            open: false
        };
    }

    handleDialogClose = () => {
        this.setState({
            open: false
        });
    };

    handleChange = event => {
        this.setState(
            {
                [event.target.name]: event.target.value
            },
            console.log(event.target.value)
        );
    };

    handleSubmit = event => {
        this.setState({
            loading: true
        });
        event.preventDefault();
        console.log("submit activated");
        const deckInfo = {
            title: this.state.title,
            input: this.state.input
        };
        axios
            .post("/createdeck", deckInfo)
            .then(res => {
                console.log(res.data.status);
                this.setState({
                    status: res.data.status,
                    loading: false,
                    open: true
                });
            })
            .catch(error => {
                console.log(error.response.data.error);
                if (error.response.data.error === "User not authenticated") {
                    window.location = "#/login";
                } else {
                    this.setState({
                        loading: false,
                        errors: error.response.data
                    });
                }
            });
        console.log("form submitted");
    };

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <Container maxWidth="sm" className={classes.root}>
                <div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <Grid>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="title"
                                label="Deck Title"
                                type="text"
                                id="title"
                                multiline={false}
                                onChange={this.handleChange}
                                value={this.state.title}
                                error={errors.deck_title ? true : false}
                                helperText={errors.deck_title}
                            />
                            <TextField
                                className={classes.deckInput}
                                variant="outlined"
                                required
                                fullWidth
                                name="input"
                                margin="dense"
                                label="Deck Content"
                                type="text"
                                id="input"
                                multiline={true}
                                rows={25}
                                onChange={this.handleChange}
                                value={this.state.input}
                                error={errors.deck_input ? true : false}
                                helperText={errors.deck_input}
                            />
                        </Grid>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={this.state.loading}
                        >
                            {this.state.loading && (
                                <CircularProgress
                                    size={15}
                                    className={classes.progress}
                                />
                            )}
                            Create Deck
                        </Button>
                        {this.state.status === "Success" ? (
                            <Typography> Deck Created Successfully</Typography>
                        ) : (
                            <Typography>Enter Deck's Title and contents above</Typography>
                        )}
                    </form>
                    <Dialog
                        open={this.state.open && this.state.status === "Success"}
                        onClose={this.handleDialogClose}
                        aria-labelledby="alert-title"
                        aria-describedby="alert-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-description">
                                Deck successfully created
                            </DialogContentText>
                            <DialogActions>
                                <Button href="#/profile">Go to Profile</Button>
                                <Button onClick={this.handleDialogClose}>close</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(CreateDeck);
