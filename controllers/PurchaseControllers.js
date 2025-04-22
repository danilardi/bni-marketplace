const { Purchase, Product, User } = require("../models")

class PurchaseControllers {
    static async purchaseProduct(req, res, next) {
        try {
            const { productId } = req.body || {}
        
            if (!productId) {
                throw { status: 400, message: 'productId are required' }
            }
            const product = await Product.findByPk(productId)
            if (!product) {
                throw { status: 404, message: 'product not found' }
            }
            const purchase = await Purchase.create({
                productId,
                userId: req.user.id
            })
            res.status(201).json({
                message: 'purchase successful',
                data: purchase
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PurchaseControllers