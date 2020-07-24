import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import onlyOne from "../image/only1.png"
import multipleQns from "../image/multiple.png"
import sampleStyingInput from "../image/sample3.png"
import productStyingInput from "../image/product3.png"
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 0 0 20px"
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

// using react-markdown to create the help page, html tag is enabled, may have security risks

export default function Help() {
  const classes = useStyles();

  const partOne = `
## What is Anki Deck Builder?
A full stack web application that automates the creation of Anki decks.

## Tech Stacks
- Database: Firebase
- Backend: Python Flask
- Frontend: ReactJS

## How to use?
Currently, **an account** is required to access our service of creating and managing the decks. 

### Sign up
1. If you already have an account, please skip this session and go to the Log in section
2. Else, click the ***sign up*** button on the top right
3. On the sign-up page, it is **required to enter all fields**. For password, a **minimum of 6 characters** is needed.
4. Upon successful sign up, you will be redirected to the home page and you can also see your **first name** displayed in the center. 
5. Due to security reasons at this version of the app, please **do not use the same password** that you used for your other online accounts. 


### Log in
1. If you have an account, please click ***log in*** button on the top right.
2. Enter your email and password.

### Create Deck
1. Once signed-in, click the ***create deck*** button on the top right.
2. At the create deck page, you can first enter the **title** for your deck. 
3. Then, enter the questions and answers for your flashcard. 
>i.   **Always** start with the first line being the question<br>
>ii.  Then, start **a new line** with **a dash '-'** (without the quotation marks, just a -) and this will be interpreted as your answer to the question<br>
>iii. If you have multiple answers, repeat step 2<br>
>iv.  To move on to the next question, start **a new line being the question** and continue from step 2<br>
>v.   Note that you need to follow the suggested format closely<br>
>vi.  Sample inputs are provided at the back for an easier reference<br>
4. (***NEW*** Optional) Select your deck style by clicking on the ***preview and styler*** button. 
5. Click the ***Create Deck*** button at the bottom. Upon successful creation, a notification box will pop up and you can choose to go to your profile page or close the notification.
6. For this version, we can mainly support **text-input and simple numerical inputs** (eg. + , - , =). Images and Latex are not supported yet.
7. You can also **bold**, *italic* or <u>underline</u> your content. However, please do not change the styling for the '-' in front of your answer as it will casue bugs in the decks produced.

### (NEW) Preview and Styler
1. At the create deck page, you can now click the ***preview and styler*** button at the bottom
2. There are 3 styles provided for now, do give it a try by clicking on the 'dark mode' or 'dark mode with colour palette'<br>
   We will add in more interesting styles and freedom for users to customerise their deck styles in the future.
3. Click *SAVE AND CLOSE*

### Profile
1. Once logged in, click the *profile* button on the top right to go to your profile page.
2. In this page, you can download the decks you have created by clicking on the ***download*** button.
3. You can also delete the decks created by clicking on the ***delete*** button. Do note the **action of deletion is irrevocable** so act with caution!

### Log out
1. You can click the ***log out*** button on the top right to log out of your account.

### Sample inputs
`;
//  an attempt to insert inline images but not working due to different addresses
// transformImageUri = {input =>
//   /^https?:/.test(input)
//   ? input
//   : `http://localhost:3000/${input}`}

  return (
    <div className={classes.root}>
      <ReactMarkdown 
        source={partOne} 
        escapeHtml = {false}
        
      />
      
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
        height = '300px'
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
        height = '500px'
        />
      </Grid>
      <Grid item >
        <Typography variant='subtitle1'>
        Example 2: sample input when there are multiple questions and answers
        </Typography>
      </Grid>
      <Grid item />
      <Grid item />
      </Grid>
      <Grid 
        container 
        spacing={1}
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item>
      <img src = {sampleStyingInput} 
        alt = 'sample input with styling' 
        width = '730px'
        height = '500px'
        />
      </Grid>
      <Grid item >
        <Typography variant='subtitle1'>
        Example 3: sample input with styling
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
      <img src = {productStyingInput} 
        alt = 'product of sample input with styling' 
        width = '730px'
        height = '500px'
        />
      </Grid>
      <Grid item >
        <Typography variant='subtitle1'>
        Example 4: preview of anki card produced from example 3 with style selected as 'dark mode with colour palette' 
        </Typography>
      </Grid>
      </Grid>
      <Grid item />
      <Grid item />
    
    
    </Grid>

      
    </div>
  );
}
