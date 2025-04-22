const { Purchase, Product, User } = require("../models")

class PurchaseControllers {
    static async purchaseProduct(req, res, next) {
        try {
            const { productId, userId } = req.body
            if (!productId || !userId) {
                throw { status: 400, message: 'Product ID and User ID are required' }
            }
            const product = await Product.findByPk(productId)
            if (!product) {
                throw { status: 404, message: 'Product not found' }
            }
            const user = await User.findByPk(userId)
            if (!user) {
                throw { status: 404, message: 'User not found' }
            }
            const purchase = await Purchase.create({
                productId,
                userId
            })
            res.status(201).json({
                message: 'Purchase successful',
                data: purchase
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PurchaseControllers