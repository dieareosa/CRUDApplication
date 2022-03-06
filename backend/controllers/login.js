
const asyncMiddleware = require('../middlewares/async');
const JSONResponse = require('../utils/custom_response');
const { generateToken } = require('../lib/token_generator');

const login = asyncMiddleware(async (req, res) => {
    const token = await generateToken()
    return res.json(JSONResponse(token));
});


module.exports = { login };