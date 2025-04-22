function authorization(req, res, next) {
    let role = req.user.role
    if (role == 'admin') {
        next()
    }
    throw { status: 401, message: 'Unauthorized' }
}

module.exports = authorization