const { Product } = require("../models")

class ProductControllers {
    static async addProduct(req, res, next) {
        try {
            const { name, price } = req.body || {}

            if (!name || !price) {
                throw { status: 400, message: "name and price are required" }
            }

            let inputProduct = {
                name,
                price,
            }

            let result = await Product.create(inputProduct)

            res.status(201).json({ message: "success" })
        } catch (error) {
            next(error)
        }
    }

    static async getAllProducts(req, res, next) {
        try {
            const products = await Product.findAll()

            res.status(200).json({ message: "success", data: products })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductControllers