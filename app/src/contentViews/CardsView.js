import React, { Component } from 'react';
import ThreadCard from './ThreadCard';

class CardsView extends Component {
  render() {
    return (
      <main role="main" className="container-fluid">
        <div>
          <h1 className="text-center pb-3">Follow Ups</h1>
        </div>
        <div className="card-columns">
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
        </div>
      </main>
    );
  }
}

export default CardsView;
