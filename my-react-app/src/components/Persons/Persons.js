import React, { PureComponent } from 'react';
import Person from './Person/Person';


class Persons extends PureComponent{
    //static contextType = AuthContext
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if(
    //         nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked
    //     ){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    // PureComponent é um shouldComponentUpdate com check de todos os states
    render () {
        return this.props.persons.map((person, index) =>{
            console.log('[Persons.js] rendering...');
            return (<Person 
                name={person.name} 
                age={person.age}
                click={() => this.props.clicked(index)}
                key={person.id}
                changed={(event) => this.props.changed(event, person.id)}
                />)
        });
    }
}
export default Persons;