import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import styles from './Cockpit.module.css'

const Cockpit = (props) => {
    const toggleBtnRef = useRef(
      null
    );
    

    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      toggleBtnRef.current.click();
      // da pra usar requisições http, quantos vc quiser
      // const timer = setTimeout(()=>{
      //   console.log('Saved data to cloud!');
      // }, 1000)
      return () => {
        // clearTimeout(timer);
        console.log('[Cockpit.js] cleanup work in useEffect');
      }
    }, []);

    let classes = [];
    if(props.personsLength <= 2){
      classes.push(styles.red);
    }
    if(props.personsLength <= 1) {
      classes.push(styles.bold);
    }
    return ( <div className={props.show ? styles.CockpitPink : styles.Cockpit}>
                <h1>{props.title}</h1>
                <p className={classes.join(' ')} >This is really working!!</p>
                <Button 
                    variant="contained"
                    ref={toggleBtnRef}
                    color={props.show ? "secondary" : "primary"} 
                    onClick={props.clicked}
                    endIcon = {props.show ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    >
                    { props.show ? 'Hide names' : 'Show names'}
                </Button>
            </div>);
};

export default React.memo(Cockpit);