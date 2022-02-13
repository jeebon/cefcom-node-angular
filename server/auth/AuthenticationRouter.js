const express = require('express');
const router = express.Router();
const UserService = require('../components/user/UserService');
const AuthenticationException = require('./AuthenticationException');
const ForbiddenException = require('../error/ForbiddenException');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const TokenService = require('./TokenService');

router.post('/login', check('email').isEmail(), async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AuthenticationException());
  }

  const { email, password } = req.body;
  const user = await UserService.findByEmail(email);
  if (!user) {
    return next(new AuthenticationException());
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new AuthenticationException());
  }
  const output = user.publicInfo();
  const token = await TokenService.createToken(user);
  res.send({
    ...output,
    token,
  });
});

router.get('/me', async (req, res, next) => {
  if (!req.authenticatedUser) {
    return next(new AuthenticationException('Unauthenticated!'));
  }
  const user = req.authenticatedUser;
  delete user.password;
  user.id = user._id;
  return res.send(user);

});

router.post('/logout', async (req, res) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.substring(7);
    //await TokenService.deleteToken(token);
  }
  res.send();
});

module.exports = router;
