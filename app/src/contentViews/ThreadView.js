import React, { Component } from 'react';
import Select from 'react-select';
import {Prompt} from 'react-router-dom';

class ThreadView extends Component {

  constructor(props) {
    super(props);

    this.deleteThread = this.deleteThread.bind(this);
    this.completeThread = this.completeThread.bind(this);
    this.saveDraft = this.saveDraft.bind(this);

    if (props.thread) {
      this.state = {
        changed: false,
        draftThread: this.props.thread,
      };
    }
  }

  textChangeHandler(field, value) {
    var newDraft = this.state.draftThread.clone();
    newDraft[field] = value;
    this.setState({changed: true, draftThread: newDraft});
  }

  renderDateForValue(date) {
    if (!date) {
      return 'yyyy-mm-dd';
    }
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  dateChangeHandler(field, value) {
    var newDraft = this.state.draftThread.clone();
    newDraft[field] = (value) ? new Date(value) : null;
    this.setState({changed: true, draftThread: newDraft});
  }

  renderReferencesForValue(references) {
    let retVal = [];
    for (let i = 0; i < references.length; i += 1) {
      retVal.push({
        value: references[i].id,
        label: <span key={references[i].id}>{references[i].name}</span>
      });
    }
    return retVal;
  }

  referenceChangeHandler(field, value) {
    var newDraft = this.state.draftThread.clone();
    newDraft[field] = value.map((t) => this.props.allThreads.find(x => x.id === t.value));
    this.setState({changed: true, draftThread: newDraft});
  }

  deleteThread() {
    let confirmText = '';
    if (!this.props.thread.allDependenciesAreResolved()) {
      confirmText += 'All dependencies will be deleted. ';
    }
    confirmText += 'Delete this?';
    if (window.confirm(confirmText)) {
      this.props.deleteThreadHandler();
    }
  }

  saveDraft() {
    this.props.threadUpdateHandler(this.state.draftThread);
    this.setState({changed: false});
  }

  completeThread() {
    var newDraft = this.state.draftThread.clone();
    newDraft['completed'] = new Date();
    this.props.threadUpdateHandler(newDraft);
    this.setState({changed: false, draftThread: newDraft});
  }

  render() {
    if (this.props.thread == null)
    {
      return <h1>Not a valid thread</h1>
    }
    return (
      <main role="main" className="container">
        <Prompt
          when={this.state.changed}
          message="You have un-saved changes. Are you sure you want to leave?" />
        <div className="form-group row">
          <label htmlFor="threadName" className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="threadName"
              value={this.state.draftThread.name}
              onChange={(e) => this.textChangeHandler('name', e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="waitingOn" className="col-sm-3 col-form-label">Waiting On</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="waitingOn"
              value={this.state.draftThread.waitingOn}
              onChange={(e) => this.textChangeHandler('waitingOn', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            value={this.state.draftThread.notes}
            onChange={(e) => this.textChangeHandler('notes', e.target.value)} >
          </textarea>
        </div>

        <div className="form-group row">
          <label htmlFor="realized" className="col-sm-3 col-form-label">Realized</label>
          <div className="col-sm-3">
            <input
              type="date"
              className="form-control"
              id="realized"
              value={this.renderDateForValue(this.state.draftThread.realized)}
              onChange={(e) => this.dateChangeHandler('realized', e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="nextExpectedUpdate" className="col-sm-3 col-form-label">Next Expected Update</label>
          <div className="col-sm-3">
            <input
              type="date"
              className="form-control"
              id="nextExpectedUpdate"
              value={this.renderDateForValue(this.state.draftThread.nextExpectedUpdate)}
              onChange={(e) => this.dateChangeHandler('nextExpectedUpdate', e.target.value)} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="completed" className="col-sm-3 col-form-label">Completed On</label>
          <div className="col-sm-3">
            <input
              type="date"
              className="form-control"
              id="completed"
              value={this.renderDateForValue(this.state.draftThread.completed)}
              onChange={(e) => this.dateChangeHandler('completed', e.target.value)} />
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="form-group row">
          <label htmlFor="dependencyOf" className="col-sm-3 col-form-label">Dependency Of</label>
          <div className="col-sm-9" id="dependencyOf">
            <Select
              placeholder="Select a Thread..."
              options={this.renderReferencesForValue(this.props.allThreads)
                .filter(x => this.state.draftThread.dependencyOf.findIndex(t => t.id === x.value))}
              value={this.renderReferencesForValue(this.state.draftThread.dependencyOf)}
              isMulti={true}
              onChange={(e) => this.referenceChangeHandler('dependencyOf', e)} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="dependentOn" className="col-sm-3 col-form-label">Dependent On</label>
          <div className="col-sm-9" id="dependentOn">
            <Select
              placeholder="Select a Thread..."
              options={this.renderReferencesForValue(this.props.allThreads)
                .filter(x => this.state.draftThread.dependentOn.findIndex(t => t.id === x.value))}
              value={this.renderReferencesForValue(this.state.draftThread.dependentOn)}
              isMulti={true}
              onChange={(e) => this.referenceChangeHandler('dependentOn', e)} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-right">
            <button type="button" className="btn btn-danger mx-1" onClick={this.deleteThread}>Delete Thread</button>
            <button type="button" className="btn btn-success mx-1" onClick={this.completeThread}>Complete Thread</button>
            <button type="button" className="btn btn-primary mx-1" onClick={this.saveDraft}>Save changes</button>
          </div>
        </div>
      </main>
    );
  }
}

export default ThreadView;
