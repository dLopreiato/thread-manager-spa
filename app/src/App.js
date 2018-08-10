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

    this.handleThreadChange = this.handleThreadChange.bind(this);
    this.handleThreadComplete = this.handleThreadComplete.bind(this);

    this.state = {
      settings: {},
      threads: this.initializeThreads()
    };

  }

  handleThreadChange(threadId, field, newValue) {
    var oldThread = this.state.threads.find(x => x.id === threadId);
    if (!oldThread) {
      console.error('this thread does not exist');
      return;
    }
    var newThread = oldThread.clone();
    newThread[field] = newValue;

    var newThreads = this.state.threads.slice();
    for (let i = 0; i < newThreads.length; i += 1) {
      let relevantThread = newThreads[i];
      
      if (relevantThread === oldThread) {
        newThreads[i] = newThread;
      }
      
      else {
        for (let j = 0; j < newThread.dependentOn.length; j += 1) {
          let otherThread = newThread.dependentOn[j];
          for (let k = 0; k < otherThread.dependencyOf.length; k += 1) {
            if (otherThread.dependencyOf[k] === oldThread) {
              otherThread.dependencyOf[k] = newThread;
            }
          }
        }

        for (let j = 0; j < newThread.dependencyOf.length; j += 1) {
          let otherThread = newThread.dependencyOf[j];
          for (let k = 0; k < otherThread.dependentOn.length; k += 1) {
            if (otherThread.dependentOn[k] === oldThread) {
              otherThread.dependentOn[k] = newThread;
            }
          }
        }
      }

    }

    this.setState({threads: newThreads});
  }

  /**
   * Lightweight function to mark threads complete.
   * @param {String} threadId The id of the thread you want to mark completed.
   */
  handleThreadComplete(threadId) {
    this.handleThreadChange(threadId, 'completed', new Date());
  }

  /**
   * @returns {Thread[]} A list of threads to start the application with.
   */
  initializeThreads() {
    // for now, prepopulate threads
    var thread6 = new Thread();
    thread6.name = 'Child Thread that is finished';
    thread6.waitingOn = 'Me';
    thread6.completed = new Date();

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
    thread2.addDependency(thread6);

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

    return [thread0, thread1, thread2, thread3, thread4, thread5, thread6];
  }

  getThread(id) {
    return this.state.threads.find(x => x.id === id);
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar />

          <Route path="/list/all" render={() =>
            <CardsView
              threads={this.state.threads}
              title="All Threads"
              threadCompleteHandler={(threadId) => this.handleThreadChange(threadId, 'completed', new Date())} />} />
          
          <Route path="/list/my-to-do" render={() =>
            <CardsView
              threads={this.state.threads.filter((t) => t.isCompletableByMe())}
              title="My Threads"
              filter={(t) => t.isCompletableByMe()}
              threadCompleteHandler={this.handleThreadComplete} />} />

          <Route path="/list/follow-ups" render={() =>
            <CardsView
              threads={this.state.threads.filter((t) => t.needsFollowUp())}
              title="Follow Ups"
              threadCompleteHandler={this.handleThreadComplete} />} />


          <Route path="/thread/:id" render={({ match }) => <ThreadView thread={this.getThread(match.params.id)} />} />
          <Route exact path="/" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
        </div>
      </Router>
    );
  }
}

export default App;
