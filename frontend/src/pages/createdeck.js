import React, { Component } from 'react'
import { Container } from '@material-ui/core'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import axios from 'axios';


export class CreateDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            input: "",
            errors: {}
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, console.log(event.target.value))
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log("submit activated")
        const deckInfo = {
            title: this.state.title,
            input: this.state.input
        }
        axios
        .post("/createdeck", deckInfo)
        .then(res => console.log(res.response))
        .catch(error => {
            console.log(error.response.data.error)
            if(error.response.data.error === "User not authenticated") {
                window.location="#/login"
            }
        })
        console.log("form submitted")
    }

    render() {
        return (
            <Container maxWidth="sm" >
                <div>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <Grid>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="title"
                            label="title"
                            type="text"
                            id="title"
                            multiline={false}
                            onChange={this.handleChange}
                            value={this.state.title}
                            />
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="input"
                            margin='dense'
                            label="input"
                            type="text"
                            id="input"
                            multiline={true}
                            onChange={this.handleChange}
                            value={this.state.input}
                            />
                        </Grid>
                        <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        >Create Deck
                        </Button>
                    </form>
                </div>
            </Container>
        )
    }
}

export default CreateDeck
