const express = require("express");
const path = require('path');
const UserRouter = require('./components/user/UserRouter');
const ProductRouter = require('./components/product/ProductRouter');
const WishlistRouter = require('./components/wishlist/WishlistRouter');
const AuthenticationRouter = require('./auth/AuthenticationRouter');
const errorHandler = require('./error/ErrorHandler');
const tokenAuthentication = require('./middleware/tokenAuthentication');
const config = require('config');

const ONE_YEAR_IN_MILLIS = 365 * 24 * 60 * 60 * 1000;
const app = express();
app.use(express.json({ limit: '3mb' }));
app.use('/images/product', express.static(path.join(__dirname, 'static', config.get('staticDir.productImg')), { maxAge: ONE_YEAR_IN_MILLIS }));
app.use(tokenAuthentication);
app.use('/api/v1/auth', AuthenticationRouter);

//Component Routes
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/products', ProductRouter);
app.use('/api/v1/wishlists', WishlistRouter);

/**Handle Errors */
app.use(errorHandler);
module.exports = app;
