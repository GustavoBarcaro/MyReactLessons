import React, {Component} from 'react';
import './App.css';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component{
  state = {
    text: ''
  }
  inputChangedHandler = (event) => {
    this.setState({
      text: event.target.value
    })
  }
  deleteCharHandler = (index) => {
    const text = this.state.text.split('');
    text.splice(index,1);
    const updatedText = text.join('');
    this.setState({
      text: updatedText
    })
  }
  render () {
    const charList = this.state.text.split('').map((char, index) =>{
      return <Char 
      character={char}
      key={index}
      clicked={()=> this.deleteCharHandler(index)}
      />
    })
    return (
      <div className="App">
        <input 
        onChange={this.inputChangedHandler} 
        type="text" 
        value={this.state.text}/>
        <p>{this.state.text}</p>
        <Validation inputLength={this.state.text.length}/>
        {
          charList
        }
      </div> 
    );
  }
}

export default App;
