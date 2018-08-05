import React, { Component } from 'react';

class ThreadModal extends Component {
  render() {
    return (
      <div className="modal fade" id="threadModal" tabindex="-1" role="dialog" aria-labelledby="threadModal" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Thread</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group row">
                <label for="threadName" className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="threadName" value="Name of the Thread" />
                </div>
              </div>

              <div className="form-group row">
                <label for="waitingOn" className="col-sm-3 col-form-label">Waiting On</label>
                <div className="col-sm-4">
                  <input type="text" className="form-control" id="waitingOn" value="Me" />
                </div>
              </div>

              <div className="form-group">
                <label for="notes">Notes</label>
                <textarea className="form-control" id="notes">Here is some stuff about the task. Maybe the name of the email thread or something?</textarea>
              </div>

              <div className="form-group row">
                <label for="realized" className="col-sm-3 col-form-label">Realized</label>
                <div className="col-sm-3">
                  <input type="date" className="form-control" id="realized" value="2018-08-03" />
                </div>
              </div>

              <div className="form-group row">
                <label for="nextExpectedUpdate" className="col-sm-3 col-form-label">Next Expected Update</label>
                <div className="col-sm-3">
                  <input type="date" className="form-control" id="nextExpectedUpdate" value="" />
                </div>
              </div>

              <div className="form-group row">
                <label for="completed" className="col-sm-3 col-form-label">Completed On</label>
                <div className="col-sm-3">
                  <input type="date" className="form-control" id="completed" value="" />
                </div>
              </div>

              <div className="row">&nbsp;</div>

              <div className="form-group row">
                  <label for="dependencyOf" className="col-sm-3 col-form-label">Dependency Of</label>
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
                  <label for="dependentOn" className="col-sm-3 col-form-label">Dependent On</label>
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
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success">Complete Thread</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ThreadModal;
