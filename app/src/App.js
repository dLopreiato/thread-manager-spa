import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import NavigationBar from './navigation/NavigationBar';
import CardsView from './contentViews/CardsView';
import WelcomeView from './contentViews/WelcomeView';
import SettingsView from './contentViews/SettingsView';
import ThreadView from './contentViews/ThreadView';
import Thread from './Thread';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      settings: {},
      threads: this.initializeThreads()
    };

  }

  /**
   * @returns {Array(Thread)} A list of threads to start the application with.
   */
  initializeThreads() {
    // for now, prepopulate threads
    var thread5 = new Thread('a');
    thread5.name = 'Child Thread (child of child thread)';
    thread5.waitingOn = 'Me';

    var thread4 = new Thread();
    thread4.name = 'Child Thread (further dependent on child thread)';
    thread4.waitingOn = 'Me';
    thread4.addDependency(thread5);

    var thread3 = new Thread();
    thread3.name = 'Child Thread (has been completed)';
    thread3.waitingOn = 'Me';
    thread3.completed = new Date();

    var thread2 = new Thread();
    thread2.name = 'Child Thread (Waiting on myself)';
    thread2.waitingOn = 'Me';

    var thread1 = new Thread();
    thread1.name = 'Child Thread (Waiting on someone else)';
    thread1.waitingOn = 'Someone else';
    thread1.nextExpectedUpdate = new Date();
    thread1.nextExpectedUpdate.setMonth(thread1.realized.getMonth() + 1);

    var thread0 = new Thread ();
    thread0.name = 'Root Thread';
    thread0.waitingOn = 'Me';
    thread0.nextExpectedUpdate = new Date();
    thread0.addDependency(thread1);
    thread0.addDependency(thread2);
    thread0.addDependency(thread3);
    thread0.addDependency(thread4);

    return [thread0, thread1, thread2, thread3, thread4, thread5];
  }

  getThread(id) {
    return this.state.threads.find(x => x.id === id);
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar />
          <Route path="/list/all" render={() => <CardsView threads={this.state.threads} />} />
          <Route path="/thread/:id" render={({ match }) => <ThreadView thread={this.getThread(match.params.id)} />} />
          <Route path="/welcome" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
        </div>
      </Router>
    );
  }
}

export default App;
