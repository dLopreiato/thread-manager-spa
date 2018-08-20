class LocalProvider {
  authenticate() {
    console.log('do nothing');
  }

  /**
   * 
   * @param {String} identifier 
   */
  getData(identifier) {
    return window.localStorage.getItem(identifier);
  }

  /**
   * 
   * @param {String} identifier key the data was stored in
   * @param {String} data 
   */
  setData(identifier, data) {
    window.localStorage.setItem(identifier, data);
  }
}

export default LocalProvider;
