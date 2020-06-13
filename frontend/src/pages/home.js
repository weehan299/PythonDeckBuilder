import React, { Component } from "react";
import Logo from "../image/brain.png";
import Container from "@material-ui/core/Container";



export class Home extends Component {
  render() {
    return (
      <Container maxWidth="xs">
        <div>
          <p>hello hehe</p>
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
