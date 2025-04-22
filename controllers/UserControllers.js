const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserControllers {
    static async userRegister(req, res, next) {
        try {
            const { name, role, password, email } = req.body || {};
            if (!name || !role || !password || !email) {
                throw {
                    status: 400,
                    message: "name, password, role, and email are required"
                }
            }

            const saltRounds = parseInt(process.env.SALT_ROUNDS)
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(password, salt)

            let inputUser = {
                name,
                role,
                password: hash,
                email,
            };

            let result = await User.create(inputUser)

            res.status(201).json({ message: "success" })
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next) {
        try {
            const { email, password } = req.body || {}

            if (!email || !password) {
                throw { status: 400, message: "bad request" }
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { status: 404, message: "email or password not found" }
            }

            const result = bcrypt.compareSync(password, user.password)

            if (!result) {
                throw { status: 404, message: "email or password not found" }
            }

            let userDecode = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

            const token = jwt.sign(userDecode, process.env.JWT_SECRET)
            res.status(200).json({
                message: "success",
                data: {
                    token
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            let users = await User.findAll()
            users = users.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })

            res.status(200).json({ message: "success", data: users })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserControllers;