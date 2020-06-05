import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Type check
import PropTypes from "prop-types";

//Axios for api call
import axios from "axios";

//logo
import Logo from "../image/brain.png";

axios.default.baseURL =
  "https://us-central1-ankideckbuilder.cloudfunctions.net/api";

function OrbitalRemarks() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"A "}
      <Link color="inherit" href="https://orbital.comp.nus.edu.sg/">
        NUS Orbital
      </Link>{" "}
      {2020}
      {" Project"}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }

  handleChange = (events) => {
    this.setState({
      [events.target.name]: events.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    axios
      .post("/signup", userInfo)
      .then((res) => {
        console.log("hello", res);
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState(
          {
            errors: err.response.data,
          },
          console.log(this.state.errors)
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
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={this.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <TextField
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  name="lastName"
                  id="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  label="Last Name"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </Grid>
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
                  helperText={
                    errors.password ? errors.password : errors.general
                  }
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  error={errors.confirmPassword ? true : false}
                  helperText={errors.confirmPassword}
                  onChange={this.handleChange}
                  value={this.state.confirmPassword}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="#/login"
                  variant="body2"
                >
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <OrbitalRemarks />
        </Box>
      </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
