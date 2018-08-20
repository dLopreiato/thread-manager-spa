import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import NavigationBar from './navigation/NavigationBar';
import CardsView from './contentViews/CardsView';
import WelcomeView from './contentViews/WelcomeView';
import SettingsView from './contentViews/SettingsView';
import ThreadView from './contentViews/ThreadView';
import Thread from './Thread';
import LocalProvider from './storageProviders/LocalProvider';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.handleThreadUpdate = this.handleThreadUpdate.bind(this);
    this.handleThreadComplete = this.handleThreadComplete.bind(this);
    this.handleThreadDelete = this.handleThreadDelete.bind(this);
    this.saveThreads = this.saveThreads.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    let provider = new LocalProvider();
    let path = 'placeholder';

    this.state = {
      settings: {provider: provider, providerPath: path},
      threads: this.initializeThreads(provider, path)
    };

    document.addEventListener('keydown', this.handleKeyUp, false);
  }

  handleKeyUp(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      this.saveThreads();
      e.preventDefault();
      return false;
    }
  }

  saveThreads() {
    let serialized = JSON.stringify(this.state.threads, Thread.jsonReplacer);
    this.state.settings.provider.setData(this.state.settings.providerPath, serialized);
    console.log('saved');
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
    return newThreads;
  }

  /**
   * Lightweight function to mark threads complete.
   * @param {String} threadId The id of the thread you want to mark completed.
   */
  handleThreadComplete(threadId) {
    var oldThread = this.state.threads.find(x => x.id === threadId);
    if (!oldThread) {
      throw new Error('this thread does not exist');
    }
    var newThread = oldThread.clone();
    newThread.completed = new Date();
    this.handleThreadUpdate(newThread);
  }

  handleThreadDelete(threadId) {
    let oldThread = this.state.threads.find(t => t.id === threadId);
    if (!oldThread) {
      throw new Error('this thread does not exist');
    }

    let targetThread = oldThread.clone();
    targetThread.dependencyOf = [];
    targetThread.dependentOn = [];
    let threadsWithoutDependency = this.handleThreadUpdate(targetThread);
    

    let newThreads = threadsWithoutDependency.slice();
    let oldThreadIndex = newThreads.findIndex(t => t.id === threadId);
    newThreads.splice(oldThreadIndex, 1);
    this.setState({threads: newThreads});
  }

  /**
   * @returns {Thread[]} A list of threads to start the application with.
   */
  initializeThreads(provider, path) {
    let data = provider.getData(path);
    let flattenedThreads = JSON.parse(data);
    return Thread.generateFromJsonList(flattenedThreads);
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
              allThreads={this.state.threads}
              deleteThreadHandler={() => this.handleThreadDelete(match.params.id)} />}
              />

          <Route path="/new-thread" render={() => {
            let newThreadList = this.state.threads.slice();
            let newThread = new Thread();
            newThread.waitingOn = 'Me';
            newThreadList.push(newThread);
            this.setState({threads: newThreadList});

            return (
              <Redirect to={'/thread/' + newThread.id} />
            );
            }} />

          <Route exact path="/" render={() => <WelcomeView />} />
          <Route path="/settings" render={() => <SettingsView />} />
        </div>
      </Router>
    );
  }
}

export default App;
