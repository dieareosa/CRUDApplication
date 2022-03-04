
const asyncMiddleware = require('../middlewares/async');
const JSONResponse = require('../utils/custom_response');
const { saveTutorial } = require('../data_access/tutorials')

const addTutorial = asyncMiddleware(async (req, res) => {
    const tutorial = req.body;
    const tutorialResponse = await saveTutorial(tutorial)
    return res.json(JSONResponse(tutorialResponse));
});


module.exports = { addTutorial }