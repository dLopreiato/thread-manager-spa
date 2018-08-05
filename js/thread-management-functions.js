/**
 * Provides common logic for task manifests.
 */
class ThreadManager
{
    constructor(taskManifest)
    {
        this.taskManifest = taskManifest;
    }

    /**
     * Generator which returns the tasks which are not completed.
     */
    *getTasks_Incomplete()
    {
        for (let node of this.taskManifest)
        {
            if (node.completed == null)
            {
                yield node;
            }
        }
    }

    /**
     * Generator which returns the tasks which the user is able to complete at this moment.
     */
    *getTasks_AvailableToTieUp()
    {
        for (let task of this.taskManifest)
        {
            if (task.waitingOn == "Me" && task.completed == null && task.allDependenciesAreResolved())
            {
                yield task;
            }
        }
    }

    /**
     * Generator which returns the tasks which the user is waiting on someone else to finish something.
     */
    *getTasks_NeedsFollowUp()
    {
        for (let task of this.taskManifest)
        {
            if (task.waitingOn != "Me" && task.completed == null && task.allDependenciesAreResolved())
            {
                yield task;
            }
        }
    }
}

/**
 * A task for the user to track or perform.
 */
class Task
{
    constructor(name)
    {
        this.name = name;
        this.waitingOn = '';
        this.notes = '';
        this.realized = new Date();
        this.nextExpectedUpdate = null;
        this.completed = null;
        this.dependentOn = [];
        this.dependencyOf = [];
    }

    /**
     * Returns true if this task is dependent on the other task. False otherwise.
     * @param {Task} otherTask The other task
     */
    isDependentOn(otherTask)
    {
        if (this.dependentOn != null)
        {
            for (var i = 0; i < this.dependentOn.length; i += 1)
            {
                if (this.dependentOn[i] == otherTask)
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Returns true if all the dependencies are resolved. False otherwise.
     * @returns {Boolean}
     */
    allDependenciesAreResolved()
    {
        if (this.dependentOn != null)
        {
            for (var i = 0; i < this.dependentOn.length; i += 1)
            {
                if (this.dependentOn[i].completed == null)
                {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Adds another task as a dependency of this task (one which must be completed before this task).
     * @param {Task} task The task which must be completed before this task may begin work
     */
    addDependency(task)
    {
        task.dependencyOf.push(this);
        this.dependentOn.push(task);
    }

    /**
     * Removes some other task as a dependency of this task.
     * @param {Task} task The task which is now unrelated to this task
     */
    removeDependency(task)
    {
        var indexOfDependency = this.dependentOn.findIndex(function(e) { return e == task; });
        if (indexOfDependency > -1)
        {
            this.dependentOn.splice(indexOfDependency, 1);
            var thisTask = this;
            var indexOfThisTaskInOthersDependencyOf = task.dependencyOf.findIndex(function(e) { return e == thisTask; });
            if (indexOfThisTaskInOthersDependencyOf > -1)
            {
                task.dependencyOf.splice(indexOfThisTaskInOthersDependencyOf, 1);
            }
        }
        
    }
}

/**
 * Give an Iterable object, force it into an array
 * @param {Iterable} iterable Some iteratable object
 */
function buildArrayFromIterator(iterable)
{
    var retVal = [];

    for (let obj of iterable)
    {
        retVal.push(obj);
    }

    return retVal;
}
