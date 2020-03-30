import React from 'react';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styles from './Cockpit.module.css'

const cockpit = (props) => {
    let classes = [];
    if(props.persons.length <= 2){
      classes.push(styles.red);
    }
    if(props.persons.length <= 1) {
      classes.push(styles.bold);
    }
    return ( <div className={props.show ? styles.CockpitPink : styles.Cockpit}>
                <h1>{props.title}</h1>
                <p className={classes.join(' ')} >This is really working!!</p>
                <Button 
                    variant="contained"
                    color={props.show ? "secondary" : "primary"} 
                    onClick={props.clicked}
                    endIcon = {props.show ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    >
                    { props.show ? 'Hide names' : 'Show names'}
                </Button>
            </div>);
};

export default cockpit;