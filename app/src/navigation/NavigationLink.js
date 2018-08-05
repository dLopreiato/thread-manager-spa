import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class NavigationLink extends Component {
  render() {
    return (
        <li className="nav-item">
          <NavLink className="nav-link" to={this.props.to} activeClassName="active">
            {this.props.text}&nbsp;
            {this.props.badge &&
              <span class="badge badge-light">
                {this.props.badge}
              </span>
            }
          </NavLink>
        </li>
    );
  }
}

export default NavigationLink;
