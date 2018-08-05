import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import NavigationLink from './NavigationLink';

class NavigationBar extends Component {
  render() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <Link className="navbar-brand" to="/list/all">Thread Manager</Link>
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navContent">
            <ul className="navbar-nav mr-auto">
              <NavigationLink to="/welcome" text="Welcome" />
              <NavigationLink to="/list/all" text="All Threads" />
              <NavigationLink to="/list/my-to-do" text="My Threads" />
              <NavigationLink to="/list/follow-ups" text="Follow Ups" />
            </ul>
            <ul className="my-2 my-lg-0 navbar-nav">
              <NavigationLink to="/settings" text="Settings" />
            </ul>
          </div>
        </nav>
      
    );
  }
}

export default NavigationBar;
