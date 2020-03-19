import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Person.css';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px auto',
      padding: "10px",
      width: theme.spacing(50),
      height: theme.spacing(20),
      position: 'relative',
      cursor: 'pointer'
    },
  },
}));
const UserOutput = props => {
  const classes = useStyles();
  const [codeState, setCodeState] = useState({
    code: Math.floor(Math.random() * 1250000)
  });
    return (
        <div 
        className={classes.root+' '+ 'Person'}>
        <Paper 
        elevation={3} 
        square={false}
        //onClick={props.click}
        >
        <p>Your User Name is {props.userName}</p>
        </Paper>
        </div>
      );
}

export default UserOutput;