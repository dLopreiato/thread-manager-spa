import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './navigation/NavigationBar';
import CardsView from './contentViews/CardsView';
import WelcomeView from './contentViews/WelcomeView';
import SettingsView from './contentViews/SettingsView';
import ThreadView from './contentViews/ThreadView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route path="/list" render={() => <CardsView />} />
          <Route path="/thread/:id" render={() => <ThreadView />} />
          <Route path="/welcome" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
        </div>
      </Router>
    );
  }
}

export default App;
