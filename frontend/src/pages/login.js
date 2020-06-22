import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Type check
import PropTypes from "prop-types";
//brain
import Logo from "../image/brain.png";
//Axios for api call
import axios from "axios";

axios.default.baseURL = "http://127.0.0.1:5000/";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // currentUser:"",
            email: "",
            password: "",
            errors: {}
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const userInfo = {
            email: this.state.email,
            password: this.state.password
        };
        //changed to hash routing i.e. #/login instead of /login
        axios
            .post("/login", userInfo)
            .then(res => {
                localStorage.setItem('currentUser', JSON.stringify(res));
                console.log(res.data);
                this.props.history.push("/");
                window.location = '/';
            })
            .catch(err => {
                //console.error("hello",err.response)
                
                this.setState(
                    {
                        errors: err.response.data
                    },
                    console.log(err.response.data)
                );
            });
        console.log("form submitted");
    };

    render() {
        const { classes } = this.props;
        const { errors } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <img src={Logo} alt="brain logo" height="50" width="50" />
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={this.handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    error={errors.email ? true : false}
                                    helperText={errors.email}
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={errors.password ? true : false}
                                    helperText={errors.password}
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#/signup" variant="body2">
                                    Do not have an Account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
