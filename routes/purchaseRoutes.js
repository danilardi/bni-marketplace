const route = require('express').Router();
const PurchaseControllers = require('../controllers/PurchaseControllers');

route.post('/', PurchaseControllers.purchaseProduct);

module.exports = route;