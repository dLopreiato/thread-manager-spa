/**
 * A thread for the user to track or perform.
 */
class Thread
{
  constructor(id)
  {
    this.id = (id == null) ? Thread.generateId() : id;
    this.name = '';
    this.waitingOn = '';
    this.notes = '';
    this.realized = new Date();
    this.nextExpectedUpdate = null;
    this.completed = null;
    this.dependentOn = [];
    this.dependencyOf = [];
  }

  /**
   * Returns true if this thread is dependent on the other thread. False otherwise.
   * @param {Thread} otherThread The other thread
   */
  isDependentOn(otherThread)
  {
    if (this.dependentOn != null)
    {
      for (var i = 0; i < this.dependentOn.length; i += 1)
      {
        if (this.dependentOn[i].id === otherThread.id)
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
   * Returns true if this thread has been completed.
   * @returns {Boolean}
   */
  isComplete()
  {
    return this.completed == null;
  }

  /**
   * Returns true if this thread can be completed by "Me".
   * @returns {Boolean}
   */
  isCompletableByMe()
  {
    return this.waitingOn === 'Me' && this.completed == null && this.allDependenciesAreResolved();
  }

  /**
   * Returns true if this thread needs to be completed by someone else.
   * @returns {Boolean}
   */
  needsFollowUp()
  {
    return this.waitingOn !== 'Me' && this.completed == null && this.allDependenciesAreResolved();
  }

  /**
   * Adds another thread as a dependency of this thread (one which must be completed before this thread).
   * @param {Thread} thread The thread which must be completed before this thread may begin work
   */
  addDependency(thread)
  {
    thread.dependencyOf.push(this);
    this.dependentOn.push(thread);
  }

  /**
   * Removes some other thread as a dependency of this thread.
   * @param {Thread} thread The thread which is now unrelated to this thread
   */
  removeDependency(thread)
  {
    var indexOfDependency = this.dependentOn.findIndex(function(e) { return e.id === thread.id; });
    if (indexOfDependency > -1)
    {
      this.dependentOn.splice(indexOfDependency, 1);
      var thisThread = this;
      var indexOfThisThreadInOthersDependencyOf = thread.dependencyOf.findIndex(function(e) { return e.id === thisThread.id; });
      if (indexOfThisThreadInOthersDependencyOf > -1)
      {
        thread.dependencyOf.splice(indexOfThisThreadInOthersDependencyOf, 1);
      }
    }
  }

  /**
   * Returns an exact copy of this thread.
   * @returns {Thread} An exact copy of this thread.
   */
  clone()
  {
    var retVal = new Thread(this.id);
    retVal.name = this.name;
    retVal.waitingOn = this.waitingOn;
    retVal.notes = this.notes;
    retVal.realized = this.realized;
    retVal.nextExpectedUpdate = this.nextExpectedUpdate;
    retVal.completed = this.completed;
    retVal.dependentOn = this.dependentOn;
    retVal.dependencyOf = this.dependencyOf;
    return retVal;
  }

  /**
   * Will replace all the flattened dependencies with the real objects.
   * @param {Array} allThreads A complete list of threads.
   * @returns {Void} This returns nothing because it will mutate the input.
   */
  static hydrateThreadList(allThreads)
  {
    var keyedById = {};
    for (var i = 0; i < allThreads.length; i++)
    {
      keyedById[allThreads[i].id] = allThreads[i];
    }

    for (i = 0; i < allThreads.length; i++)
    {
      var thisThread = allThreads[i];
      var dependencyOf = [];
      for (var j = 0; j < thisThread.dependencyOf.length; j++)
      {
        dependencyOf.push(keyedById[thisThread.dependencyOf[j]]);
      }

      var dependentOn = [];
      for (j = 0; j < allThreads[i].dependentOn.length; j++)
      {
        dependentOn.push(keyedById[thisThread.dependentOn[j]]);
      }

      thisThread.dependencyOf = dependencyOf;
      thisThread.dependentOn = dependentOn;
    }
  }

  /**
   * Function to be passed into JSON.stringify when serializing Threads.
   * @param {String} key 
   * @param {Object} value 
   */
  static jsonReplacer(key, value)
  {
    if (key === 'dependentOn' || key === 'dependencyOf')
    {
      var retVal = [];
      for (var i = 0; i < value.length; i++)
      {
        retVal[i] = value[i].id;
      }
      return retVal;
    }
    return value;
  }

  /**
   * @returns {String} A randomly generated string (of length 32) of lowercase letters and numbers.
   */
  static generateId()
  {
    function s4() {
      return Math.floor((1 + Math.random()) * 1679616)
        .toString(36)
        .substring(1);
    }
    return s4() + s4() + s4() + s4();
  }
}

export default Thread;
