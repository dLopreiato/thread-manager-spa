import React, { Component } from 'react';
import ThreadCard from './ThreadCard';

class CardsView extends Component {
  render() {
    return (
      <main role="main" className="container-fluid">
        <div>
          <h1 className="text-center pb-3">{this.props.title}</h1>
        </div>
        <div className="card-columns">
          {this.props.threads.map((thread) => <ThreadCard thread={thread} key={thread.id} />)}
        </div>
      </main>
    );
  }
}

export default CardsView;
