import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onStorePerson} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name}
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStorePerson: (name, age) => dispatch({type: actionTypes.STORE_PERSON, personData: { name: name, age: age }}),
        onDeletePerson: (id) => dispatch({type: actionTypes.DELETE_PERSON, id: id})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Persons);