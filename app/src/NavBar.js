import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#list/all">Thread Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#list/all">All Threads</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#list/my-to-do">
                My To Do
                <span className="badge badge-light">8</span>
                <span className="sr-only">threads open</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#list/follow-ups">Follow Ups</a>
            </li>
          </ul>
          <div className="my-2 my-lg-0 navbar-nav">
            <div className="form-inline nav-item input-group">
              <input className="form-control" type="text" placeholder="Search Threads" aria-label="Search Threads" />
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button">Search</button>
              </div>
            </div>
            <a className="nav-link" href="#settings">Settings</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
