import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ThreadCard extends Component {

  getDependencyPills() {
    const maxPills = 3;

    let pills = this.props.thread.dependentOn.slice(0,maxPills).map((thread) =>
      <Link className="badge badge-pill badge-secondary mx-1" to={'/thread/' + thread.id} key={thread.id}>
        {thread.name}
      </Link>);

    return (
      <p className="card-text">
        {pills}
        {this.props.thread.dependentOn.length > maxPills &&
          <span className='badge badge-pill badge-secondary mx-1'>. . .</span>
        }
      </p>
    );
  }

  getActionButton() {
    if (this.props.thread.completed != null)
    {
      return (
        <button className="btn btn-secondary btn-sm float-right" type="button" disabled>Completed</button>
      );
    }
    else {
      const buttonText = this.props.thread.allDependenciesAreResolved() ? 'Complete' : 'Force Complete';
      return (
        <button className="btn btn-success btn-sm float-right" type="button" onClick={this.props.threadCompleteHandler} >{buttonText}</button>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            <Link className="card-link" to={"/thread/" + this.props.thread.id}>{this.props.thread.name}</Link>
          </h5>
        </div>
        {this.props.thread.waitingOn !== "Me" &&
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Contact: {this.props.thread.waitingOn}</li>
          </ul>
        }
        <div className="card-body">

          {this.props.thread.notes != null &&
            <p className="card-text">
              {this.props.thread.notes}
            </p>
          }

          {this.props.thread.dependentOn != null &&
            this.getDependencyPills()
          }

          <p className="card-text">
            <small className="text-muted">
              {this.props.thread.nextExpectedUpdate != null &&
                'Due ' + this.props.thread.nextExpectedUpdate.toLocaleString()
              }
              &nbsp;
            </small>

            {this.getActionButton()}
          </p>

        </div>
      </div>
    );
  }


}

export default ThreadCard;
