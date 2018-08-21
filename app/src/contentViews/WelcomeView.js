import React, { Component } from 'react';

class WelcomeView extends Component {
  render() {
    return (
      <main role="main">
        <div className="container">
          <h1 className="text-center">Welcome!</h1>
          <p>
            This app is built for people who have to track not only their own tasks, but the tasks of their peers.
          </p>

          <h2>What is a Thread?</h2>
          <p>
            A thread is a task or tasks that need to be completed. What makes it different from a "task" is that it
            may have an owner and dependencies. If you create threads structures such that a single thread can only be
            completed once it's dependencies have been completed, you will find the views built into this app very helpful.
          </p>

          <h2>How do the Views Work?</h2>
          <p>
            This app has 3 main views (linked to at the top left).
            <br />
            <strong className='text-info'>All Threads</strong> - 
            This contains all of the threads that you have entered into this app. Nothing special here.
            <br />
            <strong className='text-info'>My Threads</strong> - 
            This contains all of the threads that you can complete now. That means each thread listed here has all of
            its dependencies complete, and has it's owner listed as "Me".
            <br />
            <strong className='text-info'>Follow Ups</strong> - 
            This contains all of the threads that you should follow up on. This means each thread listed here has all
            of its dependencies complete, and it's owner listed as something other than "Me".
          </p>

          <h2>Where Is This Data Saved?</h2>
          <p>
            This app is built using the <a href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API'>Web
            Storage APIs</a>. For most browsers, as long as you don't clear browser site data for this page, it will
            maintain your tasks. You can view the storage being used by hitting F12, and looking for the "Local
            Storage" section under the "Storage" tab.
          </p>
        </div>
      </main>
    );
  }
}

export default WelcomeView;
