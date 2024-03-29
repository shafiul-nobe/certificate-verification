/* eslint-disable no-prototype-builtins */
import Errors from './errors';
// import apiRequest from './apiRequest';

class Form {
  /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
  constructor(data) {
    this.originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
  }

  /**
     * Populate the form with the given data.
     */
  populate(data) {
    for (let field in this.originalData) {
      if (data.hasOwnProperty(field)) { this[field] = data[field]; }
    }
  }

  /**
     * Fetch all relevant data for the form.
     */
  data() {
    let data = {};

    for (let property in this.originalData) {
      data[property] = this[property];
    }

    return data;
  }

  /**
     * Fetch all fields of the form while initializing.
     */
  fields() {
    let fields = [];
    for (let field in this.originalData) {
      fields.push(field);
    }

    return fields;
  }

  /**
     * Reset the form fields.
     */
  reset() {
    for (let field in this.originalData) {
      this[field] = this.originalData[field];
    }

    this.errors.clear(null);
  }

  /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     * @param data
     */
  post(url, data = null) {
    return this.submit('post', url, data);
  }

  /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     * @param data
     */
  put(url, data = null) {
    return this.submit('put', url, data);
  }

  /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     * @param data
     */
  patch(url, data = null) {
    return this.submit('patch', url, data);
  }

  /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     * @param data
     */
  delete(url, data = null) {
    return this.submit('delete', url, data);
  }

  // /**
  //    * Submit the form.
  //    *
  //    * @param {string} requestType
  //    * @param {string} url
  //    * @param data
  //    */
  // submit(requestType, url, data = null) {
  //   let formData = data || this.data();
  //   return new Promise((resolve, reject) => {
  //     apiRequest({
  //       method: requestType,
  //       url: url,
  //       data: formData,
  //     }).then((result) => {
  //       resolve(result);
  //     }).catch((err) => {
  //       reject(err);
  //     });
  //   });
  // }
}

export default Form;
