import React, {Component} from 'react';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component{
	state = {
		persons: [
			{ id: 1, name: "Gustavo", age: 18 },
			{ id: 2, name: "Guilherme", age: 18 },
			{ id: 3, name: "isadora", age: 28 }
    ],
    switched: false,
    show: false
  }

nameChangedHandler = (event, id) => {
  const personIndex = this.state.persons.findIndex(p => {
    return p.id === id;
  });
  const person = {
    ...this.state.persons[personIndex]
  };
  person.name = event.target.value;
  const persons = [...this.state.persons];
  persons[personIndex] = person;
  this.setState({
    persons: persons
  })
}

delelePersonHandler = (personIndex) =>{
  const persons = [...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

togglePersonsHandler = () =>{
    const doesShow = this.state.show;
    this.setState({
      show: !doesShow
    })
}
 
	render () {
    let persons = null;
    if(this.state.show){
      persons = <Persons 
                  persons={this.state.persons}
                  clicked={this.delelePersonHandler}
                  changed={this.nameChangedHandler}  
                />
          }
		return (
		  <div className={styles.App}>
        <Cockpit 
          persons={this.state.persons}
          show={this.state.show}
          clicked={this.togglePersonsHandler}
        />
        { persons }
		  </div>
		);
	}
}
export default App;
