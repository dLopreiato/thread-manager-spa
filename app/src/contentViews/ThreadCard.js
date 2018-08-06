import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ThreadCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <Link className="card-link" to="/thread/abcdefgh">This is Some Thread</Link>
            </h5>
          <p className="card-text">This is where the thread notes would go. This particular thread is one for myself. This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><a className="badge badge-pill badge-secondary" href="#thread/iunfdsa">The Thread This Is Dependent On </a></p>
          <p className="card-text">
            <small className="text-muted">Due Tomorrow</small>
            <button className="btn btn-success btn-sm float-right" type="button">Complete</button>
          </p>
        </div>
      </div>
    );
  }
}

export default ThreadCard;
