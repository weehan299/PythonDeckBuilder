import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//Link
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));




export default function ButtonAppBar({userLoggedIn, logOut}) {
  const classes = useStyles();
  
  console.log('isLoggedin', userLoggedIn)
  if (userLoggedIn) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6" className={classes.title} component={Link} to='/'>
              Anki Deck Builder
            </Typography>
            <Button color="inherit" component={Link} to='/profile'>Profile</Button>
            <Button color="inherit" component={Link} to='/createdeck'>Create Deck</Button>
            <Button color="inherit" onClick={logOut} component={Link} to='/'>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography color="inherit" variant="h6" className={classes.title} component={Link} to='/'>
              Anki Deck Builder
            </Typography>
            <Button color="inherit" component={Link} to='/login'>Login</Button>
            <Button color="inherit" component={Link} to='/signup'>Sign up</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

