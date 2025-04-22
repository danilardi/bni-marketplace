const route = require('express').Router();
const UserControllers = require('../controllers/UserControllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register user baru
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *           example:
 *             name: Alex Bimbil
 *             email: alex@example.com
 *             password: secret123
 *             role: admin
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Data tidak lengkap
 */
route.post('/register', UserControllers.userRegister);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: alex@example.com
 *             password: secret123
 *     responses:
 *       200:
 *         description: Login berhasil
 *       400:
 *         description: Email atau password kosong
 *       404:
 *         description: Email atau password salah
 */
route.post('/login', UserControllers.userLogin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Mendapatkan semua user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar user
 *       401:
 *         description: access denied or unauthorized
 *
 *     
 */
route.get('/users', authentication, authorization, UserControllers.getAllUsers);

module.exports = route;