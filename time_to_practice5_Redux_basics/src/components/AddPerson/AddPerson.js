import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component{
    
    state = {
        name: "",
        age: ""
    }

    nameChangedHandler = (event) => {
        this.setState({
            name: event.target.value
        });
    }


    ageChangedHandler = (event) => {
        this.setState({
            age: event.target.value
        });
    }

    render (){
        return (
            <div className="AddPerson">
            <div>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange={this.nameChangedHandler} 
                    value={this.state.name}/>
            </div>
            <div>
                <input 
                    type="number" 
                    placeholder="Age" 
                    name="age" 
                    onChange={this.ageChangedHandler} 
                    value={this.state.age}/>
            </div>
            <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
        </div>
        );
    }


};

export default AddPerson;