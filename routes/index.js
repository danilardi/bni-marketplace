const route = require('express').Router();
const PurchaseControllers = require('../controllers/PurchaseControllers');
const authentication = require('../middlewares/authentication');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const authorization = require('../middlewares/authorization');

route.get('/', authentication, authorization, (req, res) => {
    res.status(200).json({
        message: "success",
        data: req?.user
    })
})

route.use(userRoutes);
route.use('/products', productRoutes);
route.use('/purchase', authentication, authorization, purchaseRoutes)


module.exports = route;