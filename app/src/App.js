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

  /**
   * 
   * @param {Thread} newThread 
   * 
   * WARNING: We are mutating objects.
   *   This is explicitly told not to do in the React documentation but we are doing it anyway. This is because
   *   this particular field is a reference field. If we were to strictly follow the rules, we would have to either
   *   use soft references (use the string id, and then perform a look up on every get), or we would have to
   *   recreate the entire tree. To avoid both of these (admittedly marginal) performance hits, we will be
   *   modifying references in objects.
   *  
   * WARNING: Parameter will have invalid thread tree
   *   If the user has adjusted any dependencies, the parameter will have an invalid thread tree which must be fixed.
   */
  handleThreadUpdate(targetThread) {
    var oldThread = this.state.threads.find(x => x.id === targetThread.id);
    if (!oldThread) {
      throw new Error('this thread does not exist');
    }

    // We "undo" the changes in the target thread because it has invalid dependencies. We'll fix those later.
    var newThread = targetThread.clone();
    newThread.dependentOn = oldThread.dependentOn.slice();
    newThread.dependencyOf = oldThread.dependencyOf.slice();

    // WARNING: WE ARE MUTATING OBJECTS.
    // This is explicitly told not to do in the React documentation but we are doing it anyway. This is because
    // this particular field is a reference field. If we were to strictly follow the rules, we would have to either
    // use soft references (use the string id, and then perform a look up on every get), or we would have to
    // recreate the entire tree. To avoid both of these (admittedly marginal) performance hits, we will be
    // modifying references in objects.
    oldThread.swapWith(newThread);

    // Maintain a list of the latest versions of the changed threads so that we may update the thread manifest
    let finalChanges = {};
    finalChanges[oldThread.id] = newThread;
    
    let dependentOnAdditions = targetThread.dependentOn.filter(t => !oldThread.dependentOn.includes(t));
    for (let newDependentOn of dependentOnAdditions) {
      let newestThread = finalChanges[oldThread.id];
      let newestDependentOn = finalChanges[newDependentOn.id] ? finalChanges[newDependentOn.id] : newDependentOn;

      let changedThreads = newestThread.addDependency(newestDependentOn);

      newestThread.swapWith(changedThreads.thisReplacement);
      newestDependentOn.swapWith(changedThreads.parameterReplacement);

      finalChanges[changedThreads.thisReplacement.id] = changedThreads.thisReplacement;
      finalChanges[changedThreads.parameterReplacement.id] = changedThreads.parameterReplacement;
    }

    let dependencyOfAdditions = targetThread.dependencyOf.filter(t => !oldThread.dependencyOf.includes(t));
    for (let newDependencyOf of dependencyOfAdditions) {
      let newestThread = finalChanges[oldThread.id];
      let newestDependencyOf = finalChanges[newDependencyOf.id] ? finalChanges[newDependencyOf.id] : newDependencyOf;

      let changedThreads = newestDependencyOf.addDependency(newestThread);

      newestDependencyOf.swapWith(changedThreads.thisReplacement);
      newestThread.swapWith(changedThreads.parameterReplacement);

      finalChanges[changedThreads.thisReplacement.id] = changedThreads.thisReplacement;
      finalChanges[changedThreads.parameterReplacement.id] = changedThreads.parameterReplacement;
    }

    let dependentOnDeletions = oldThread.dependentOn.filter(t => !targetThread.dependentOn.includes(t));
    for (let formerDependentOn of dependentOnDeletions) {
      let newestThread = finalChanges[oldThread.id];
      let newestNonDependentOn = finalChanges[formerDependentOn.id] ? finalChanges[formerDependentOn.id] : formerDependentOn;

      let changedThreads = newestThread.removeDependency(newestNonDependentOn);

      newestThread.swapWith(changedThreads.thisReplacement);
      newestNonDependentOn.swapWith(changedThreads.parameterReplacement);

      finalChanges[changedThreads.thisReplacement.id] = changedThreads.thisReplacement;
      finalChanges[changedThreads.parameterReplacement.id] = changedThreads.parameterReplacement;
    }

    let dependencyOfDeletions = oldThread.dependencyOf.filter(t => !targetThread.dependencyOf.includes(t));
    for (let formerDependencyOf of dependencyOfDeletions) {
      let newestThread = finalChanges[oldThread.id];
      let newestNonDependencyOf = finalChanges[formerDependencyOf.id] ? finalChanges[formerDependencyOf.id] : formerDependencyOf;

      let changedThreads = newestNonDependencyOf.removeDependency(newestThread);

      newestNonDependencyOf.swapWith(changedThreads.thisReplacement);
      newestThread.swapWith(changedThreads.parameterReplacement);

      finalChanges[changedThreads.thisReplacement.id] = changedThreads.thisReplacement;
      finalChanges[changedThreads.parameterReplacement.id] = changedThreads.parameterReplacement;
    }

    var newThreads = this.state.threads.map(x => finalChanges[x.id] ? finalChanges[x.id] : x);

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
    var thread7 = new Thread();
    thread7.name = 'Independent Thread';
    thread7.waitingOn = 'Me';

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

    thread0.dependentOn = [thread1, thread2, thread3, thread4];
    thread1.dependencyOf = [thread0];
    thread2.dependencyOf = [thread0];
    thread2.dependentOn = [thread6];
    thread3.dependencyOf = [thread0];
    thread4.dependencyOf = [thread0];
    thread4.dependentOn = [thread5];
    thread5.dependencyOf = [thread4];
    thread6.dependencyOf = [thread2];

    return [thread0, thread1, thread2, thread3, thread4, thread5, thread6, thread7];
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
