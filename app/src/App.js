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

    this.handleThreadUpdate = this.handleThreadUpdate.bind(this);
    this.handleThreadComplete = this.handleThreadComplete.bind(this);

    this.state = {
      settings: {},
      threads: this.initializeThreads()
    };

  }

  // TODO: Handle reference changes
  handleThreadUpdate(newThread) {
    var oldThread = this.state.threads.find(x => x.id === newThread.id);
    if (!oldThread) {
      console.error('this thread does not exist');
      return;
    }
    else {
      var newThreads = this.state.threads.slice();
      for (let i = 0; i < newThreads.length; i += 1) {
        let relevantThread = newThreads[i];
        
        if (relevantThread === oldThread) {
          newThreads[i] = newThread;
        }
        
        else {
          // WARNING: WE ARE MUTATING OBJECTS.
          // This is explicitly told not to do in the React documentation but we are doing it anyway. This is because
          // this particular field is a reference field. If we were to strictly follow the rules, we would have to either
          // use soft references (use the string id, and then perform a look up on every get), or we would have to
          // recreate the entire tree. To avoid both of these (admittedly marginal) performance hits, we will be
          // modifying references in objects.

          // For clarity on what these two for loops do: We go thread every dependency on this thread (which requires 2
          // for loops since these are double linked lists), and modify the references of that dependency to point to the
          // newly cloned thread instead of the old thread.
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
    }

    this.setState({threads: newThreads});
    console.log('thread saved');
  }

  /**
   * Lightweight function to mark threads complete.
   * @param {String} threadId The id of the thread you want to mark completed.
   */
  handleThreadComplete(threadId) {
    var oldThread = this.state.threads.find(x => x.id === threadId);
    if (!oldThread) {
      console.error('this thread does not exist');
      return;
    }
    var newThread = oldThread.clone();
    newThread.completed = new Date();
    this.handleThreadUpdate(newThread);
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
              threadCompleteHandler={this.handleThreadComplete} />} />
          
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

          <Route path="/thread/:id" render={({ match }) =>
            <ThreadView
              // Without the key attribute, a new ThreadView will not be drawn if linked to within another ThreadView
              key={match.params.id} 
              thread={this.getThread(match.params.id)}
              threadUpdateHandler={this.handleThreadUpdate}
              allThreads={this.state.threads} />}
              />

          <Route exact path="/" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
        </div>
      </Router>
    );
  }
}

export default App;
