import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';


const Layout = props => {
    const [showSideDrawer, setShoeSideDrawer] = useState(false)

    
    const SideDrawerClosedHandler = () => {
        setShoeSideDrawer(false)
    }

    const SideDrawerToggleHandler = () => {
        setShoeSideDrawer(!showSideDrawer)
    }

    return ( 
        <Aux>
            <Toolbar
                auth={props.isAuthenticated}
                openSideDrawer={SideDrawerToggleHandler}/>
            <SideDrawer
                auth={props.isAuthenticated}
                open={showSideDrawer} 
                closed={SideDrawerClosedHandler} />
            <main className={ classes.Content } > 
                {
                    props.children
                } 
            </main>    
        </Aux>
    )


}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);