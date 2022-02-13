module.exports = function ValidationException(errors) {
  this.status = 400;
  this.errors = errors;
  this.message = 'Validation Failure';
};
