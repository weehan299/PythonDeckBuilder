import React, { Component } from "react";
import "./App.css";
//'react-router-dom
import { HashRouter as Router, Switch, Route } from "react-router-dom";

//MUI theme provider
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//MuiComponents
import Navbar from "./components/Navbar";

//Pages
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import CreateDeck from "./pages/createdeck";
import Profile from "./pages/profile";

import axios from 'axios';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

class App extends Component {
  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      isLoggedIn: ""
    };  
  }

  componentDidMount() {
    console.log("App.js, isLoggedIn" )
    if (localStorage.getItem("currentUser") != null) {
      this.setState({isLoggedIn: true})
      console.log("App.js, true",this.state.isLoggedIn )
    } else {
      this.setState({isLoggedIn: false})
      console.log("App.js, false",this.state.isLoggedIn)
    }
  }

  
  logOut() {
    this.setState({isLoggedIn: false}); 
    localStorage.removeItem("currentUser")
    localStorage.clear()
    
    axios
    .post("/logout")
    .then((res) => {
      console.log("successful logout", res)
      
    })
    .catch((err) => {
        console.log(err)
    })
    
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar userLoggedIn={this.state.isLoggedIn} logOut={this.logOut}  />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/createdeck" component={CreateDeck} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
  
}

export default App;
