import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px auto',
      padding: "10px",
      width: theme.spacing(50),
      height: theme.spacing(16),
      position: 'relative'
    },
  },
}));
const Person = props => {
  const classes = useStyles();
  const [codeState, setCodeState] = useState({
    code: Math.floor(Math.random() * 1250000)
  });
    return (
        <div className={classes.root}>
        <Paper elevation={3} square={false}>
            <p>I'm a {props.name} and I am {props.age} years old</p>
            <p>{props.children}</p>
            <p><b>My Code: </b>{codeState.code}</p>
        </Paper>
        </div>
      );
}

export default Person;