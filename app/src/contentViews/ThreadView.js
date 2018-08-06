import React, { Component } from 'react';

class ThreadView extends Component {
  render() {
    return (
      <main role="main" className="container">
        <div className="form-group row">
          <label htmlFor="threadName" className="col-sm-3 col-form-label">Name</label>
          <div className="col-sm-9">
            <input type="text" className="form-control" id="threadName" defaultValue="Name of the Thread" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="waitingOn" className="col-sm-3 col-form-label">Waiting On</label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="waitingOn" defaultValue="Me" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea className="form-control" id="notes" defaultValue="Here is some stuff about the task. Maybe the name of the email thread or something?"></textarea>
        </div>

        <div className="form-group row">
          <label htmlFor="realized" className="col-sm-3 col-form-label">Realized</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="realized" defaultValue="2018-08-03" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="nextExpectedUpdate" className="col-sm-3 col-form-label">Next Expected Update</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="nextExpectedUpdate" defaultValue="" />
          </div>
        </div>

        <div className="form-group row">
          <label htmlFor="completed" className="col-sm-3 col-form-label">Completed On</label>
          <div className="col-sm-3">
            <input type="date" className="form-control" id="completed" defaultValue="" />
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="form-group row">
          <label htmlFor="dependencyOf" className="col-sm-3 col-form-label">Dependency Of</label>
          <div className="input-group col-sm-9" id="dependencyOf">
            <div className="btn-group mr-1" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary">Thread 1</button>
              <button type="button" className="btn btn-outline-danger">&times;</button>
            </div>
            <div className="btn-group mr-1" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary">Thread 3</button>
              <button type="button" className="btn btn-outline-danger">&times;</button>
            </div>
            <div className="btn-group mr-1" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary">Thread 4</button>
              <button type="button" className="btn btn-outline-danger">&times;</button>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3"></div>
          <div className="input-group col-sm-6">
            <input type="text" className="form-control" id="dependencyOf" placeholder="Another Thread" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button" id="button-addon2">Add</button>
            </div>
          </div>
        </div>

        <div className="row">&nbsp;</div>

        <div className="form-group row">
          <label htmlFor="dependentOn" className="col-sm-3 col-form-label">Dependent On</label>
          <div className="input-group col-sm-9" id="dependentOn">
            <div className="btn-group mr-1" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary">Thread 2</button>
              <button type="button" className="btn btn-outline-danger">&times;</button>
            </div>
            <div className="btn-group mr-1" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-outline-secondary">Thread 5</button>
              <button type="button" className="btn btn-outline-danger">&times;</button>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-3"></div>
          <div className="input-group col-sm-6">
            <input type="text" className="form-control" id="dependencyOf" placeholder="Another Thread" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button" id="button-addon2">Add</button>
            </div>
          </div>
        </div>

        <div className="row">
          <button type="button" className="btn btn-success">Complete Thread</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </main>
    );
  }
}

export default ThreadView;
