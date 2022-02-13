const express = require('express');
const router = express.Router();
const WishlistService = require('./WishlistService');
const { check, validationResult } = require('express-validator');
const ValidationException = require('../../error/ValidationException');
const ForbiddenException = require('../../error/ForbiddenException');
const AuthenticationException = require('../../auth/AuthenticationException');
const pagination = require('../../middleware/pagination');

router.post('/',
  check('product').notEmpty()
    .withMessage('Product not selected!'),
  async (req, res, next) => {
    if (!req.authenticatedUser) {
      return next(new AuthenticationException('Unauthenticated!'));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }

    try {
      const item = await WishlistService.findByUserIdAndProductId(req.body.product, req.authenticatedUser._id);
      if (item) {
        return res.send({ message: 'Item already added in wishlist!' });
      }
    } catch (err) {
      //
    }

    try {
      await WishlistService.save(req.body, req.authenticatedUser._id);
      return res.send({ message: 'Successfully product added to wishlist!' });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/', pagination, async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthenticated!'));
  }
  const { page, size } = req.pagination;
  const data = await WishlistService.getItems(page, size, req.authenticatedUser);
  res.send(data);
});

router.get('/:id', async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthenticated!'));
  }
  try {
    const user = await WishlistService.getItem(req.params.id);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthorized'));
  }

  try {
    await WishlistService.deleteHoax(req.params.hoaxId, req.authenticatedUser.id);
    res.send();
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
