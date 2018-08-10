import React, { Component } from 'react';
import ThreadCard from './ThreadCard';

class CardsView extends Component {

  constructor(props) {
    super(props);

    this.handleThreadComplete = this.handleThreadComplete.bind(this);
  }

  handleThreadComplete(threadId) {
    console.log("cardsView.handleThreadComplete");
    this.props.threadCompleteHandler(threadId);
  }

  render() {
    return (
      <main role="main" className="container-fluid">
        <div>
          <h1 className="text-center pb-3">{this.props.title}</h1>
        </div>
        <div className="card-columns">
        {this.props.threads.map((thread) =>
          <ThreadCard
            thread={thread}
            key={thread.id}
            threadCompleteHandler={(e) => this.handleThreadComplete(thread.id)} />
          )}
        </div>
      </main>
    );
  }
}

export default CardsView;
