import React, { Component } from "react";
import Logo from "../image/brain.png";
import Container from "@material-ui/core/Container";
import axios from 'axios';


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
    }

    componentDidMount() {
        axios
        .get("/profile")
        .then(res => {
            console.log(res.data)
            var result = res.data['email']
            console.log(result)
            this.setState({
                email: result
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

  render() {
    return (
      <Container maxWidth="xs">
        <div>
          <h2> {this.state.email} </h2>
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <h1>Hi Welcome to Anki Deck Builder</h1>
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
          <img src={Logo} alt="brain logo" height="50" width="50" />
        </div>
      </Container>
    );
  }
}

export default Home;
