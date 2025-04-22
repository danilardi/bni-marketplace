const route = require('express').Router();
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const purchaseRoutes = require('./purchaseRoutes');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.get('/', (req, res) => {
    res.status(200).json({
        message: "hi, CrackEarth is here!!",
    })
})

route.use(userRoutes);
route.use('/products', productRoutes);
route.use('/purchase', authentication, purchaseRoutes)

module.exports = route;