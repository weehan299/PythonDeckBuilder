// Let users see all their decks
import React, { Component } from "react";

//Creating a table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// styling for profile
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";
//import moment from "moment";
import * as moment from "moment-timezone";

axios.defaults.withCredentials = true;

//TODO: change the formatting of textboxes, put padding.
const styles = {
    button: {
        textTransform: "none"
    },
    progress: {
        position: "absolute"
    },
    td: {
        //textAlign: "right",
        verticalAlign: "bottom"
    }
};
export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            downloadLoading: false,
            deleteLoading: false
        };
    }

    componentDidMount() {
        console.log("new versionnnnn");
        axios
            /*
            .get("https://pythondeckbuilder.herokuapp.com/profile")
            */
            .get("/profile")
            .then(res => {
                var results = JSON.parse(res.data["profile"]);
                var array = [];
                results.forEach(x => array.push(x));
                this.setState({
                    decks: array
                });
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    handleDownloadClick = deck => {
        //var url = ""
        console.log(deck);
        this.setState({
            downloadLoading: true
        });
        axios
            /*
            .get(`https://pythondeckbuilder.herokuapp.com/deck/${deck.deck_id}`, {
                withCredentials: true
            })
            */
            .get(`/deck/${deck.deck_id}`)
            .then(res => res.data.URL)
            .then(url => {
                window.location = url;
                this.setState({
                    downloadLoading: false
                });
            })
            .catch(err => console.log(err.data));
    };

    handleDeleteClick = deck => {
        this.setState({
            deleteLoading: true
        });
        axios
            /*
            .delete(`https://pythondeckbuilder.herokuapp.com/deck/${deck.deck_id}`, {
                withCredentials: true
            })
            */
            .delete(`/deck/${deck.deck_id}`)
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
                this.setState({
                    deleteLoading: false
                });
            })
            .catch(err => console.err(err.data));
    };

    //TODO: find a way such that not all button is disabled when one is pressed.
    render() {
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="All the user's decks">
                    <TableHead>
                        <TableRow>
                            <TableCell>Deck</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Download</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.decks.map(deck => (
                            <TableRow key={deck.deck_name}>
                                <TableCell scope="row" component="th">
                                    {deck.deck_name}
                                </TableCell>
                                <TableCell className={classes.td}>
                                    {moment(deck.created_at)
                                        .tz("Asia/Singapore")
                                        .format("hh:mm a dddd, DD MMMM")}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className={classes.button}
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.handleDownloadClick(deck)}
                                        disabled={this.state.downloadLoading}
                                    >
                                        {this.state.downloadLoading && (
                                            <CircularProgress
                                                size={15}
                                                className={classes.progress}
                                            />
                                        )}
                                        Download
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className={classes.button}
                                        size="small"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => this.handleDeleteClick(deck)}
                                        disabled={this.state.deleteLoading}
                                    >
                                        {this.state.deleteLoading && (
                                            <CircularProgress
                                                size={15}
                                                className={classes.progress}
                                            />
                                        )}
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(styles)(Profile);
