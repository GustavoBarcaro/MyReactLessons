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
				name: "Gustavo",
				age: 18
			},
			{
				name: "Guilherme",
				age: 18
			},
			{
				name: "isadora",
				age: 28
			}
    ],
    switched: false,
    show: false
  }
  
  switchNameHandler = newName =>{
    // console.log("was clicked");
    // Não usar isso: this.state.persons[0].name = "Gustavo Barcaro"
    if(this.state.switched === false){
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
            name: "isadora Bedanni",
            age: 28
          }
        ],
        switched : true
      });
    }else{
      this.setState({
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
            name: "Isadora",
            age: 28
          },
        ],
        switched: false
      });
    }
    
  }
  nameChangedHandler = (event) => {
    this.setState({
      persons:[
        {
          name: "Gustavo Barcaro",
          age: 18
        },
        {
          name: event.target.value,
          age: 18
        },
        {
          name: "isadora Bedanni",
          age: 28
        }
      ],
    });
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
      persons = (          <div>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
          click={this.switchNameHandler}
          >
          My Hobbies: Programing
          </Person>
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler}
          changed={this.nameChangedHandler}>My Hobbies: Playing</Person>
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
          click={this.switchNameHandler}
          >My Hobbies: Racing</Person>
      </div> );
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
