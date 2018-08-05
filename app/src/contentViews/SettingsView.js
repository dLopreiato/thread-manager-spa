import React, { Component } from 'react';

class SettingsView extends Component {
  render() {
    return (
      <main role="main" className="container">
        <div>
            <h1 className="text-center pb-3">Settings</h1>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6 col-sm-8 form-group">
                <label for="exampleFormControlSelect1">Storage Option</label>
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>Local</option>
                    <option>Provider A</option>
                    <option>Provider B</option>
                    <option>Provider C</option>
                    <option>Provider D</option>
                </select>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-md-6 col-sm-8 form-group">
                <label for="exampleFormControlInput1">Location</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value="My/File/Directory/Tasks.json" />
            </div>
        </div>
      </main>
    );
  }
}

export default SettingsView;
