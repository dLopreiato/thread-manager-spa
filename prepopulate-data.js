// Pre-populate some tasks for development
var task5 = new Task('Child Task (child of child task)');
task5.waitingOn = 'Me';

var task4 = new Task('Child Task (further dependent on child task)');
task4.waitingOn = 'Me';
task4.addDependency(task5);

var task3 = new Task('Child Task (has been completed)');
task3.waitingOn = 'Me';
task3.completed = new Date();

var task2 = new Task('Child Task (Waiting on myself)');
task2.waitingOn = 'Me';

var task1 = new Task('Child Task (Waiting on someone else)')
task1.waitingOn = 'Someone else';
task1.nextExpectedUpdate = new Date();
task1.nextExpectedUpdate.setMonth(task1.realized.getMonth() + 1);

var task0 = new Task ('Root Task');
task0.waitingOn = 'Me';
task0.nextExpectedUpdate = new Date();
task0.addDependency(task1);
task0.addDependency(task2);
task0.addDependency(task3);
task0.addDependency(task4);

var threadManager = new ThreadManager([task0, task1, task2, task3, task4, task5]);
