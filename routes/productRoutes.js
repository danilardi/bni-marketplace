const ProductControllers = require('../controllers/ProductControllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const route = require('express').Router();

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *           example:
 *             name: Product A
 *             price: 10000
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 */
route.post('/', authentication, authorization, ProductControllers.addProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of products
 */
route.get('/', ProductControllers.getAllProducts);

module.exports = route;