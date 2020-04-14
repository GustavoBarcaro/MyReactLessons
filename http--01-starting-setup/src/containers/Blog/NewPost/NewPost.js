import React, { Component } from 'react';
import axios from 'axios'
import {Redirect } from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Gustavo',
        submited: false
    }


    
    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                //this.props.history.replace() faz o mesmo q o Redirect
                //adiciona mais uma pagina no 'stack'
                this.props.history.push('/posts');
                // this.setState({
                //     submited:true
                // })
            });
    }

    render () {
        // Substitui a pagina q estamos, setinha de voltar  não volta pro new post
        // let redirect = null;
        // if(this.state.submited){
        //         redirect = <Redirect to="posts" />;
        // }
        return (
            <div className="NewPost">
                {/* { redirect } */}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Gustavo">Gustavo</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;