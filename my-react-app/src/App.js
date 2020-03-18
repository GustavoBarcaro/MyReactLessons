import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Person  from './Person/Person';
import Button from '@material-ui/core/Button';
import FindReplaceIcon from '@material-ui/icons/FindReplace';



class App extends Component{
	state = {
		persons: [
			{
				name: "Gustavo",
				age: 18
			},
			{
				name: "Guilherme",
				age: 18
			},
			{
				name: "Matheus",
				age: 28
			},
			{
				name: "Jean",
				age: 30
      }
		]
  }
  
  switchNameHandler = () =>{
    // console.log("was clicked");
    // Não usar isso: this.state.persons[0].name = "Gustavo Barcaro"
    this.setState({
      persons:[
        {
          name: "Gustavo Barcaro",
          age: 18
        },
        {
          name: "Guilherme Ribeiro",
          age: 18
        },
        {
          name: "Isadora Bedanni",
          age: 28
        }
      ]
    });
  }
	render () {
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
         onClick={this.switchNameHandler}
         endIcon = {<FindReplaceIcon/>}>
          Switch name
        </Button>
			  <Person name={this.state.persons[0].name} age={this.state.persons[0].age}>My Hobbies: Programing</Person>
			  <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>My Hobbies: Playing</Person>
			  <Person name={this.state.persons[2].name} age={this.state.persons[2].age}>My Hobbies: Racing</Person>
		  </div>
		);
		//return React.createElement('div', {className: 'App'},React.createElement('h1', null, 'Do it work??'))
	  }
}
export default App;
