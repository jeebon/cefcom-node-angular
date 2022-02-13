const express = require('express');
const router = express.Router();
const ProductService = require('./ProductService');
const { check, validationResult } = require('express-validator');
const ValidationException = require('../../error/ValidationException');
const ForbiddenException = require('../../error/ForbiddenException');
const AuthenticationException = require('../../auth/AuthenticationException');
const pagination = require('../../middleware/pagination');

router.post('/',
  check('name').notEmpty()
    .withMessage('Name cannot be null')
    .bail()
    .isLength({ max: 200 })
    .withMessage('Name must have max 200 characters'),
  check('description').notEmpty()
    .withMessage('description cannot be null')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Description must have max 500 characters'),
  check('imageUrl').notEmpty()
    .withMessage('Image cannot be null'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    try {
      await ProductService.save(req.body);
      return res.send({ message: 'Successfully product added!' });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', pagination, async (req, res) => {
  const authenticatedUser = req.authenticatedUser;
  let { name } = req.params;
  const filters = {
    name: name || ''
  }
  const { page, size } = req.pagination;
  const data = await ProductService.getItems(page, size, filters, authenticatedUser);
  res.send(data);
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await ProductService.getItem(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
