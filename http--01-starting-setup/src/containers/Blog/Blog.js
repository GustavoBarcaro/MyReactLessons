import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
// import axios from '../../axios'
import Posts from './Posts/Posts';
import './Blog.css';
import NewPost from './NewPost/NewPost'
import FullPost from './FullPost/FullPost'

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* Nvalink é o link com class active, com activeClassName muda o nome da classe ativa */}
                            <li><NavLink to="/" exact>Home</NavLink></li>
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
                    <Route path="/" exact  component={Posts}/>
                    <Route path="/new-post"   component={NewPost}/>
                    <Route path="/:id" exact  component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;