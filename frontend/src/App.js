import React from "react";
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
import Help from "./pages/help";


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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/createdeck" component={CreateDeck} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/help" component={Help} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
