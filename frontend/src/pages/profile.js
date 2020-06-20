// Let users see all their decks
import React, { Component } from 'react'
import { Container, Typography } from '@material-ui/core'


//Creating a table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from "@material-ui/core/Button";

import axios from 'axios';
import moment from 'moment'


export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: [] 
        }
    }
    

    componentDidMount() {
        axios
        .get("/profile")
        .then(res => {
            console.log(res.data)
            var results = JSON.parse(res.data['profile'])
            var array = []
            results.forEach(x => array.push(x))
            this.setState({
                decks: array
            })
        })
        .catch(error => {
            console.log(error.response)
        })
        console.log("Component did Mount")
    }

    handleClick = (deck) => {
        //var url = ""
        console.log(deck)
        axios
        .get(`/deck/${deck.deck_id}`)
        .then(res => res.data.URL)
        .then(url => window.location=url)
        .catch(err => console.log(err.data))
    }

    


    render() {
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="All the user's decks">
                    <TableHead>
                        <TableCell>Deck</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Download</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.state.decks.map(deck =>(
                            <TableRow key={deck.deck_name}>
                                <TableCell scope="row" component='th'>{deck.deck_name}</TableCell>
                                <TableCell>{moment(deck.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant='contained' 
                                        color='secondary' 
                                        onClick={() => this.handleClick(deck)} 
                                    >
                                        download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default Profile

