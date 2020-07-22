import React, { Component } from "react";
import { Toolbar, Typography } from "@material-ui/core";
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
// for pop up with preview and styler
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

// preview images
import DefaultImg from "../image/defaultPreview.png";
import Style1Img from "../image/style1Preview.png";
import Style2Img from "../image/style2Preview.png";

//rich text editor
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";



//axios.defaults.baseURL = "https://pythondeckbuilder.herokuapp.com";

const styles = {
    root: {
        //margin: "10px",
        //borderRadius: 3,
        border: 0,
        color: "black",
        height: 48,
        padding: "10px 20px 0 0 "
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

// exploring transition effect for material UI 
// the diaglog for preview and styler moves up from bottom when opened
// const stylerTransition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });

// style2 is adapted from Shamim Ahmed, https://medshamim.com/med/how-to-design-beautiful-anki-cards
const cardStyle = {
    default: ".card \
    {\n font-family: arial; \n font-size: 20px;\n text-align: center;\n color: \
    black;\n background-color: white;\n}\ ",
    style1:".card \
    {\n font-family: cursive;\n font-size: 20px;\n text-align: center;\n color: \
    #eee8d5;\n background-color: #333B45;\n} \ ",
    style2:".card \
    {\n font-family: Menlo, baskerville, sans;\n font-size: 20px;\n text-align: center;\n color: \
    #D7DEE9;\n background-color: #333B45;\n} \  \n b  { color: #C695C6 !important; } \
    \n strong {color: #C695C6 !important;} \
    \n u { text-decoration: none; color: #5EB3B3;} \
    \n span { text-decoration: none; color: #5EB3B3;} \
    \n i  {\n color: IndianRed; \n} \ \n EM  {\n color: IndianRed; \n} \ "
}


export class CreateDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            input: "",
            status: "",
            css: cardStyle.default,
            previewImg: DefaultImg,
            errors: {},
            loading: false,
            open: false,
            stylerOpen: false
        };
        this.handleStyleChange = this.handleStyleChange.bind(this);
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

    handleEditorChange = (content, editor) => {
        this.setState(
            {
                input: content
            },
            console.log(this.state.input)
        );
    };

    // figure out a smart way of changing the css and picture?
    handleStyleChange = selection => {
        if (selection === "default") {
            this.setState(
                { 
                    css: cardStyle.default,
                    previewImg: DefaultImg
                }
            ) 
        } else if (selection === "style1") {
            this.setState(
                { 
                    css: cardStyle.style1,
                    previewImg: Style1Img
                }
            ) 
        } else if (selection === "style2") {
            this.setState(
                { 
                    css: cardStyle.style2,
                    previewImg: Style2Img
                }
            )
        }
        console.log("current css", this.state.css)
        
    }

    //open and closing pop up for styler
    handleOpenStyler = () => {
        this.setState(
            {
                stylerOpen: true
            }
        )
    }
    handleCloseStyler = () => {
        this.setState(
            {
                stylerOpen: false
            }
        )
    }

    handleSubmit = event => {
        this.setState({
            loading: true
        });
        event.preventDefault();
        const deckInfo = {
            title: this.state.title,
            input: this.state.input,
            css: this.state.css
        };
        // remember to add withCredentials: true
        axios
            /*
            .post("https://pythondeckbuilder.herokuapp.com/createdeck", deckInfo, {
                withCredentials: true
            })
            */
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
            <React.Fragment>
            {/* Section for user input */}
                <Grid
                    container
                    className={classes.root}
                    direction="row"
                    justify="center"
                    spacing={5}
                >
                    <Grid item>
                        <form onSubmit={this.handleSubmit} noValidate>
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
                            {/*
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
                            */}
                            {/* numlist is removed as it is not compatible */}
                            <Editor
                                apiKey='ylsa1rebk4639viotcnscrk0okc0mzu0emsmne7evqda6kxx'
                                initialValue=""
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount"
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic underline backcolor | alignleft aligncenter alignright alignjustify | bullist outdent indent | removeformat | help"
                                }}
                                onEditorChange={this.handleEditorChange}
                            />
                            <Grid 
                                container
                                direction="row"
                                spacing = {1}
                            >  
                                <Grid item> 
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
                                </Grid>

                                <Grid item> 
                                    <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            onClick = {this.handleOpenStyler}
                                        >
                                            Preview and Styler
                                    </Button>
                                </Grid>
                            </Grid>
                            {errors.deck_input === "Deck input must not empty" ? (
                                <Typography color='secondary'>
                                    Deck input must not be empty
                                </Typography>
                            ) : (
                                <Typography >
                                    Enter Deck's Title and contents above
                                </Typography>
                            )}
                        </form>
                    </Grid>
                    {/* The helper button */}
                    <Grid item>
                        <Grid container direction="column" spacing={5}>
                            <Grid item />
                            <Grid item />
                            <Grid item />
                            <Grid item />
                            <Grid item />
                            <Grid item />
                            
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    href="#/help"
                                >
                                    Unsure of the format?
                                </Button>
                                
                            
                        </Grid>
                    </Grid>
                </Grid>

                {/* The preview and styler section */}
                    
                <Dialog
                    open={this.state.stylerOpen}
                    onClose={this.handleCloseStyler}
                    aria-describedby="preview and styler window"
                >   
                    <DialogTitle>
                        Preview and Styler
                    </DialogTitle>
                    <Toolbar>
                        <Button
                            variant="outline"
                            color="primary"
                            className={classes.button}
                            onClick = {() => this.handleStyleChange('default')}
                        >
                            Default
                        </Button>
                        <Button
                            variant="outline"
                            color="primary"
                            className={classes.button}
                            onClick = {() => this.handleStyleChange('style1')}
                        >
                            Dark Mode
                        </Button>
                        <Button
                            variant="outline"
                            color="primary"
                            className={classes.button}
                            onClick = {() => this.handleStyleChange('style2')}
                        >
                            Dark Mode with Colour Palette
                        </Button>
                    </Toolbar>
                    <div>
                            <img
                                src = {this.state.previewImg}
                                alt = "preview images"
                                Height="300"
                                Width="500"
                            />
                    </div>  
                    <DialogActions>
                        <Button edge="start" variant="outline" color="primary" onClick={this.handleCloseStyler} aria-label="close">
                                Save and Close
                        </Button>

                    </DialogActions>
                </Dialog>
                
                {/* full screen version of pop up? */}
                {/* <AppBar >
                        <Toolbar>
                            <Button edge="start" color="inherit" onClick={this.handleCloseStyler} aria-label="close">
                                Close
                            </Button>
                            <Typography variant="h6" >
                                Preview and Styler
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.handleCloseStyler} aria-label="save and close">
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar> */}

                {/* The diaglog pop up after creating deck */}
                <Dialog
                    open={this.state.open && this.state.status === "Success"}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-title"
                    aria-describedby="alert-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-description" color="inherit">
                            Deck successfully created
                        </DialogContentText>
                        <DialogActions>
                            <Button href="#/profile">Go to Profile</Button>
                            <Button onClick={this.handleDialogClose}>close</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(CreateDeck);
