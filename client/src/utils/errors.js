/* eslint-disable no-prototype-builtins */
class Errors {
  /**
     * Create a new Errors instance.
     */
  constructor() {
    this.errors = {};
    this.message = null;
  }

  /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */
  has(field) {
    return this.errors.hasOwnProperty(field);
  }

  /**
     * Determine if we have any errors.
     */
  any() {
    return Object.keys(this.errors).length > 0;
  }

  /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
  get(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
  }

  /**
     * Record the new errors.
     *
     * @param {object} errors
     */
  record(errors) {
    this.errors = errors;
  }

  /**
     * Clear one or all error fields.
     *
     * @param {string|null} field
     */
  clear(field = null) {
    if (field) {
      this.errors[field] = null;
      delete this.errors[field];

      return;
    }

    this.errors = {};
  }

  /**
     * Set generic message for the form submission error.
     *
     * @param {string} message
     */
  setMessage(message) {
    this.message = message;
    return message;
  }

  /**
     * Get generic message for the form submission error.
     *
     * @returns {string|null}
     */
  getMessage() {
    return this.message;
  }
}

export default Errors;
