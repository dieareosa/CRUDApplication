const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const EXPIRATION = 1000 * 50 * 5;

function verifyToken(req, res) {
    const token = req.headers['authentication-token'];
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({message: 'Invalid token'});
            } else {
                req.decoded = decoded;
            }
        });
    } else {
        res.status(403).send({
            message: 'Token no provided.'
        });
    }
}

const generateToken = () => {
    return jwt.sign({}, JWT_SECRET_KEY, {expiresIn: EXPIRATION.toString()});
};

module.exports = {generateToken, verifyToken};