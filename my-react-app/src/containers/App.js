import React, {Component} from 'react';
import styles from './App.module.css';
import Person  from '../components/Persons/Person/Person';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
      persons = (
        <div>
        {
          this.state.persons.map((person, index) =>{
            return <Person 
            name={person.name} 
            age={person.age}
            click={() => this.delelePersonHandler(index)}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })
        }
        </div> 
      );
    }
    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push(styles.red);
    }
    if(this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }
		return (
		  <div className={styles.App}>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
			  <h1 className={this.state.show ? styles.h1Pink : styles.h1}>Hi, I'm a React App</h1>
			  <p className={classes.join(' ')} >This is really working!!</p>
			  <Button 
         variant="contained"
         color={this.state.show ? "secondary" : "primary"} 
         onClick={this.togglePersonsHandler}
         endIcon = {this.state.show ? <VisibilityOffIcon/>: <VisibilityIcon/>}
         >
          { this.state.show ? 'Hide names' : 'Show names'}
        </Button>
        {
          persons
        }
		  </div>
		);
	}
}
export default App;
