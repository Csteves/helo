import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav/Nav';
import routes from './routes';
import{HashRouter,Switch,Router} from 'react-router-dom';

class App extends Component {
  render() {


    return (
      <div>
        {routes}
        <Nav/>
      </div>
    );
  }
}

export default App;
