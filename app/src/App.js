import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import CardView from './contentViews/CardView';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CardView />
      </div>
    );
  }
}

export default App;
