const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ?  data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';


  // name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  // email chekcs
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is invalid';
  }

  // password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords don\'t match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}