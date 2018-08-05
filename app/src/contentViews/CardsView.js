import React, { Component } from 'react';
import ThreadCard from './ThreadCard';

class CardsView extends Component {
  render() {
    return (
      <main role="main" class="container-fluid">
        <div>
          <h1 class="text-center pb-3">Follow Ups</h1>
        </div>
        <div class="card-columns">
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
