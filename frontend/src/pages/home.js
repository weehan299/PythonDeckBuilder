import React, { Component } from "react";
import Logo from "../image/brain.png";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

import { Link } from "react-router-dom";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

    componentDidMount() {
        axios
            .get("profile")
            .then(res => {
                console.log(res.data);
                var result = res.data["first_name"];
                console.log(result);
                this.setState({
                    email: result
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

  render() {
    return (
      <Container maxWidth="xs">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          spacing={3}
        >
          <Grid item /> {/*used to add spacing at the top */}
          <Grid item />
          <Grid item />
          <Grid item />
          <Grid item />
          <Grid item />
          <Grid item />
          <Grid item />
          <Grid
            container
            direction="horizontal"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <img
                src={Logo}
                className="center"
                alt="brain logo"
                height="40"
                width="40"
              />
            </Grid>
            <Grid item>
              <Typography variant="h3">Welcome</Typography>
            </Grid>
            <Grid item>
              <img
                src={Logo}
                className="center"
                alt="brain logo"
                height="40"
                width="40"
              />
            </Grid>
          </Grid>
          {this.state.email !== "" ? (
            <div>
              <Typography variant="h6">{this.state.email}</Typography>
            </div>
          ) : (
            <Grid item />
          )}
          <Grid item />
          <Grid item />
          <Grid />
          <Grid item>
            <Button color="contained" component={Link} to="/help">
              help
            </Button>
            <Button color="inherit" component={Link} to="/createdeck">
              Create Deck
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Home;
