const express = require('express');
const router = express.Router();
const UserService = require('./UserService');
const { check, validationResult } = require('express-validator');
const ValidationException = require('../../error/ValidationException');
const ForbiddenException = require('../../error/ForbiddenException');
const AuthenticationException = require('../../auth/AuthenticationException');
const pagination = require('../../middleware/pagination');

router.post('/',
  check('name').notEmpty()
    .withMessage('Name cannot be null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('name must have min 4 and max 32 characters'),
  check('email')
    .notEmpty()
    .withMessage('Email cannot be null')
    .bail()
    .isEmail()
    .withMessage('E-mail is not valid')
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error('E-mail in use');
      }
    }),
  check('phone').notEmpty()
    .withMessage('Phone cannot be null')
    .bail()
    .isLength({ min: 10, max: 11 })
    .withMessage('phone'),
  check('password')
    .notEmpty()
    .withMessage('Password cannot be null')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
    .withMessage('Password must have at least 1 uppercase, 1 lowercase letter and 1 number'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      await UserService.save(req.body);
      return res.send({ message: 'Successfully user created!' });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', pagination, async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthorized!'));
  }
  const { name } = req.params;
  const filters = {
    name: name || ''
  }
  const { page, size } = req.pagination;
  const data = await UserService.getUsers(page, size, filters);
  return res.send(data);
});

router.get('/:id', async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthorized!'));
  }
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
