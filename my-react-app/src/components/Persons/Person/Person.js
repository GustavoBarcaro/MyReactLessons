import React, { useState } from 'react';
import propTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './Person.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import WithClass from "../../../hoc/WithClass";
// import styled from 'styled-components';

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
const Person = props => {
  const classes = useStyles();
  const [codeState, setCodeState] = useState({
    code: Math.floor(Math.random() * 1250000)
  });
  console.log('[Person.js] rendering...');
    return (
        <WithClass classes={classes.root+' '+ 'Person'}>
          <Paper 
            elevation={3} 
            square={false}
            >
            <IconButton 
            className="deletar"
            variant="contained"
            color="primary" 
            onClick={props.click}
            
            ><DeleteIcon/>
            </IconButton>
                <p>I'm {props.name} and I am {props.age} years old</p>
                <p>{props.children}</p>
                <p><b>My Code: </b>{codeState.code}</p>
                <input 
                  type="text"
                  onChange={props.changed} 
                  value={props.name} />
            </Paper>
        </WithClass>
      );
}

Person.propTypes = {
  click: propTypes.func,
  name: propTypes.string,
  age: propTypes.number,
  changed: propTypes.func
};

export default Person;