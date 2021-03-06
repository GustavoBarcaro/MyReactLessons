import React, {Component} from 'react';

import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

import WithClass from '../hoc/WithClass'
import AuthContext from '../context/auth-context'

class App extends Component{
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }
	state = {
		persons: [
			{ id: 1, name: "Gustavo", age: 18 },
			{ id: 2, name: "Guilherme", age: 18 },
			{ id: 3, name: "isadora", age: 28 }
    ],
    switched: false,
    show: false,
    showCockpit: true,
    authenticated: false
  }

static getDerivedStateFromProps(props, state){
  console.log('[App.js] getDerivedStateFromProps', props);
  return state;
}

componentDidMount () {
  console.log('[App.js] componentDidMount');
}

shouldComponentUpdate(nextProps, nextState) {
  console.log('[App.js] shouldComponentUpdate');
  // if(nextState.show !== this.state.show){
  //   return true;
  // }else if(nextState.showCockpit !== this.state.showCockpit){
  //   return true;
  // }else{
  //   return false;
  // }
  return true;
}

componentDidUpdate () {
  console.log('[App.js] componentDidUpdate');
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

loginHandler = () => {
  this.setState({
    authenticated: true
  });
}
 
	render () {
    console.log('[App.js] render')
    let persons = null;
    if(this.state.show){
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.delelePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated ={this.state.authenticated}  
        />
      )
          }
		return (
		  <WithClass classes={styles.App}>

        <button 
        onClick={() => {
            this.setState({showCockpit: !this.state.showCockpit})
        }}>
          Toggle Cockpit
        </button>
        <AuthContext.Provider  value={
            {
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }
        }>
          {this.state.showCockpit ? 
          <Cockpit
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
            show={this.state.show}
            clicked={this.togglePersonsHandler}
            login={this.loginHandler}
          /> 
          : null}
          { persons }
        </AuthContext.Provider>
		  </WithClass>
		);
	}
}
export default App;
