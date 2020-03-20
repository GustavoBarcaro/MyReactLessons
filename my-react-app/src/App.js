import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Person  from './Person/Person';
import Button from '@material-ui/core/Button';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';



class App extends Component{
	state = {
		persons: [
			{
        id: 1,
				name: "Gustavo",
				age: 18
			},
			{
        id:2,
				name: "Guilherme",
				age: 18
			},
			{
        id:3,
				name: "isadora",
				age: 28
			}
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
		return (
		  <div className="App">
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
			  <h1>Hi, I'm a React App</h1>
			  <p>This is really working!!</p>
			  <Button 
         variant="contained"
         color="primary" 
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
		//return React.createElement('div', {className: 'App'},React.createElement('h1', null, 'Do it work??'))
	  }
}
export default App;
