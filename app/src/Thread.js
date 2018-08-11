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
   * Method which mutates the dependency threads to replace this thread with the given thread.
   * @param {Thread} newThread The thread which will replace this thread.
   */
  swapWith(newThread)
  {
    // Validate this can be swapped.
    if (newThread.id !== this.id)
    {
      throw new Error('Thead being hot swapped must have the same id');
    }

    for (let i = 0; i < this.dependentOn.length; i += 1)
    {
      let otherThread = this.dependentOn[i];
      let indexOfSelfInOther = otherThread.dependencyOf.indexOf(this);
      otherThread.dependencyOf[indexOfSelfInOther] = newThread;
    }

    for (let i = 0; i < this.dependencyOf.length; i += 1)
    {
      let otherThread = this.dependencyOf[i];
      let indexOfSelfInOther = otherThread.dependentOn.indexOf(this);
      otherThread.dependentOn[indexOfSelfInOther] = newThread;
    }
  }

  /**
   * Returns two new threads where the given thread is added as a dependency of this thread.
   * @param {Thread} thread The thread which must be completed before this thread may begin work
   * @returns {Thread[]} Two new threads which correlate to the updated version of this thread, and the updated version
   *   of the dependency. In order to actually make a change to the thread tree, these threads must be swapped.
   */
  addDependency(thread)
  {
    let newParent = this.clone();
    let newChild = thread.clone();
    
    newParent.dependentOn.push(newChild);
    newChild.dependencyOf.push(newParent);

    return {thisReplacement: newParent, parameterReplacement: newChild};
  }

  /**
   * Returns two new threads where the given thread is no longer a dependency of this thread.
   * @param {Thread} thread The thread which is now unrelated to this thread
   * @returns {Thread[]} Two new threads which correlate to the updated version of this thread, and the updated version
   *   of the former dependency. In order to actually make a change to the thread tree, these threads must be swapped.
   */
  removeDependency(thread)
  {
    let newNonParent = this.clone();
    let newNonChild = thread.clone();

    newNonParent.dependentOn.splice(newNonParent.dependentOn.indexOf(thread), 1);
    newNonChild.dependencyOf.splice(newNonChild.dependencyOf.indexOf(this), 1);

    return {thisReplacement: newNonParent, parameterReplacement: newNonChild};
  }

  /**
   * Returns a list of dependency mismatches (if any exist) that stem from this thread.
   * @returns {String[]} Empty array if no dependency mismatches exist.
   */
  validateDependencies()
  {
    var retVal = [];
    for (let i = 0; i < this.dependentOn.length; i += 1)
    {
      let otherThread = this.dependentOn[i];

      if (otherThread.dependencyOf.indexOf(this) < 0)
      {
        retVal.push(otherThread.id + ' exists in ' + this.id + '\'s dependentOn field. The reverse is not true.');
      }
    }

    for (let i = 0; i < this.dependencyOf.length; i += 1)
    {
      let otherThread = this.dependencyOf[i];

      if (otherThread.dependentOn.indexOf(this) < 0)
      {
        retVal.push(otherThread.id + ' exists in ' + this.id + '\'s dependencyOf field. The reverse is not true.');
      }
    }

    return retVal;
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
    retVal.dependentOn = this.dependentOn.slice();
    retVal.dependencyOf = this.dependencyOf.slice();
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
