import React from 'react';
import User from '../../components/User';

const authIndexPage = (props) => { 
    return (
      <div>
        <h1>The Auth Index Page - {props.appName}</h1>
        <User name="Gustavo" age="18"/>
      </div>
    )
}

authIndexPage.getInitialProps = (context) => {
    return { appName: "Super Auth App"};
}

export default authIndexPage;