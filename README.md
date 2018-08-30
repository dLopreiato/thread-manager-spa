# Thread Manager SPA #
*A different kind of task manager*

Thread Manager SPA is a task manager built for someone who has to keep track of a lot of threads. Not everything needed for a given project is in your power, sometimes you just have to wait for someone else to finish a task. Often times you'll have to reach out and reminder them that you are waiting. This task manager is meant to help with that!

## Infrastructure ##

I plan on building this as a Single Page App, where users can save their tasks to the cloud storage provider of their choice. Using OAuth implicit grants, we can host this app on GitHub for free and let anyone use it at any time. Think of it as a BYOS app (bring your own storage.)

## Contributing ##
At this moment, I'm not accepting contributions. This is mostly because I don't have the time to write out an entire outline of my vision.

# Developing #

## Setting Up Your Environment ##
Open up your terminal and navigate to the ```/app``` directory of this repository. Run ```npm install```. You should be good to go!

## Building & Developing ##
While you're in the ```/app``` directory, run ```npm run start``` to start up the node server. Since this project is built on React, the React Developer Tools ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/), [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)) are recommended.

## Building & Release ##
In the ```/app``` directory, run ```npm run deploy```. This will commit the build to the master branch and push to origin.
