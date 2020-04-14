import React, { Component , Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
// import axios from '../../axios'

import './Blog.css';
import Posts from './Posts/Posts';
// import asyncComponent from '../../hoc/asyncComponent'
// import NewPost from './NewPost/NewPost'

// pra carregar de forma assíncrona
// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });

//maneira nova 16.6
const NewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state= {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* Nvalink é o link com class active, com activeClassName muda o nome da classe ativa */}
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Switch só mostra um unico component */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post"  
                    render={
                        ()=>(
                            <Suspense fallback={<div>Loading...</div>}>
                                <NewPost/>
                            </Suspense>
                        )}
                        /> : null}
                    <Route path="/posts" component={Posts}/>
                    {/* <Route render={() => <h1>Not found</h1>} /> */}
                    <Redirect from="/" to ="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;