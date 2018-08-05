import React, { Component } from 'react';
import './App.css';
import NavigationBar from './navigation/NavigationBar';
import CardsView from './contentViews/CardsView';
import WelcomeView from './contentViews/WelcomeView';
import SettingsView from './contentViews/SettingsView';
import {HashRouter as Router, Route} from 'react-router-dom';
import ThreadModal from './contentViews/ThreadModal';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route path="/list" render={() => <CardsView />} />
          <Route path="/welcome" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
          <ThreadModal />
        </div>
      </Router>
    );
  }
}

export default App;
