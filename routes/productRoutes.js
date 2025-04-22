const ProductControllers = require('../controllers/ProductControllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const route = require('express').Router();

route.post('/', authentication, authorization, ProductControllers.addProduct);
route.get('/', ProductControllers.getAllProducts);

module.exports = route;