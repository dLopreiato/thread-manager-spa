import React, { Component } from 'react';
import Select from 'react-select';
import {Link} from 'react-router-dom';

class ThreadView extends Component {

  notImplemented(event) {
    console.warn('onChange not implemented');
  }

  logDateChange(event)
  {
    console.log(event.target.value)
  }

  renderDateForValue(date) {
    if (date == null) {
      return 'yyyy-mm-dd';
    }
    return date.getFullYear() + '-' + ('0' + date.getDate()).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  render() {
    if (this.props.thread == null)
    {
      return <h1>Not a valid thread</h1>
    }
    return (
      <main role="main" className="container">
        <div className="form-group row">
          <label htmlFor="threadName" className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="threadName" value={this.props.thread.name} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="waitingOn" className="col-sm-3 col-form-label">Waiting On</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="waitingOn" value={this.props.thread.waitingOn} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea className="form-control" id="notes" value={this.props.thread.notes} onChange={this.notImplemented}></textarea>
        </div>

        <div className="form-group row">
          <label htmlFor="realized" className="col-sm-3 col-form-label">Realized</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="realized" value={this.renderDateForValue(this.props.thread.realized)} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="nextExpectedUpdate" className="col-sm-3 col-form-label">Next Expected Update</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="nextExpectedUpdate" value={this.renderDateForValue(this.props.thread.nextExpectedUpdate)} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="completed" className="col-sm-3 col-form-label">Completed On</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="completed" value={this.renderDateForValue(this.props.thread.completed)} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="form-group row">
          <label htmlFor="dependencyOf" className="col-sm-3 col-form-label">Dependency Of</label>
          <div className="col-sm-9" id="dependencyOf">
            <Select placeholder="Select a Task..." options={[{value: 'plchldr', label: 'Placeholder'}]} isMulti={true} value={[{value: 'plchldr', label: 'Placeholer'}]} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="dependentOn" className="col-sm-3 col-form-label">Dependent On</label>
          <div className="col-sm-9" id="dependentOn">
            <Select placeholder="Select a Task..." options={[{value: 'chocolate1', label: <span>Chocolate<Link to="/thread/a">&#8594;</Link></span>}]} isMulti={true} onChange={this.notImplemented} />
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-right">
            <button type="button" className="btn btn-success mx-1" onClick={this.notImplemented}>Complete Thread</button>
            <button type="button" className="btn btn-primary mx-1" onClick={this.notImplemented}>Save changes</button>
          </div>
        </div>
      </main>
    );
  }
}

export default ThreadView;
