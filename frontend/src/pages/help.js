import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import onlyOne from "../image/only1.png"
import multipleQns from "../image/multipleQuestions.png"
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function Help() {
  const classes = useStyles();

  const partOne = `
## What is Anki Deck Builder?
A full stack web application that automates the creation of Anki decks.

## Tech Stacks
- Backend: Python
- Frontend: ReactJS

## How to use?
For this version of our app, you have to **use an account** to access our service of creating and managing the decks. 

### Sign up
1. If you already have an account, please skip this session and go to the Log in section
2. Else, click the *sign up* button on the top right
3. On the sign-up page, it is **required to enter all fields**. For password, a **minimum of 6 characters** is needed.
4. Upon successful sign up, you will be redirected to the home page and you can also see your **first name** displayed in the center. 
5. Due to security reasons at this version of the app, please **do not use the same password** that you used for your other online accounts. We will upgrade the security measures in the future.

### Log in
1. If you have an account, please click ***log in*** button on the top right.
2. Enter your email and password.
3. Upon successful log in, you will be redirected to the home page and you can also see your **first name** displayed in the center.

### Create Deck
1. Once you have signed-in, you can locate the ***create deck*** button on the top right. Click on the button.
2. At the create deck page, you can first enter the **title** for your deck. This will also be the deck title when you import the deck to Anki.
3. Deck content is where you enter the questions and answers for your flashcard. 
    1. Always start with the first line being the question
    2. Then, start **a new line** with **a dash '-'** (without the quotation marks, just a -) and this will be interpreted as your answer to the question
    3. If you have multiple answers, repeat step 2
    4. To move on to the next question, start **a new line being the question** and continue from step 2
    5. Note that you need to follow the suggested format closely
    6. Sample inputs are provided at the back for an easier reference

4. Click the ***Create Deck*** button at the bottom. Upon successful creation, a notification box will pop up and you can choose to go to your profile page or close the notification. 
5. For this version, we can mainly support **text-input and simple numerical inputs** (eg. + , - , =). Images and other more complex math symbols will be supported in the future.
6. It is recommended to create your questions and answers in **a local text editor** and then pasted into the *create deck* page for generation.

### Profile
1. Once logged in, you can click the *profile* button on the top right to go to your profile page.
2. In this page, you can download the decks you have created by clicking on the ***download*** button.
3. You can also delete the decks created by clicking on the ***delete*** button. Do note the **action of deletion is irrevocable** so act with caution!

### Log out
1. You can click the ***log out*** button on the top right to log out of your account.

### Sample inputs
`;


  return (
    <div className={classes.root}>
      <ReactMarkdown source={partOne} />
      
      <Grid 
        container 
        spacing={2}
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item />
      <Grid item />
      <Grid 
        container 
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item >
      
      <img src = {onlyOne} 
        alt = 'only one question' 
        width = '700px'
        height = '200px'
        /> 
      </Grid>
      <Grid item >
        <Typography variant="subtitle1">
        Example 1: sample input when there is only one question and answer
        </Typography>
        </Grid>
      </Grid>
      <Grid item />
      <Grid item />
      <Grid 
        container 
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item>
      <img src = {multipleQns} 
        alt = 'more than one questions' 
        width = '730px'
        height = '300px'
        />
      </Grid>
      <Grid item >
        <Typography variant='subtitle1'>
        Example 2: sample input when there are multiple questions and answers
        </Typography>
      </Grid>
      </Grid>
      </Grid>
    </div>
  );
}