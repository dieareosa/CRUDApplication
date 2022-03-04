
const asyncMiddleware = require('../middlewares/async');
const JSONResponse = require('../utils/custom_response');
const { createTutorialDB, getTutorialDB, getTutorialsDB, deleteTutorialDB, updateTutorialDB, deleteTutorialsDB } = require('../data_access/tutorials')

const addTutorial = asyncMiddleware(async (req, res) => {
    const tutorial = req.body;
    const tutorialResponse = await createTutorialDB(tutorial)
    return res.json(JSONResponse(tutorialResponse));
});

const getTutorial = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const tutorialResponse = await getTutorialDB(id)
    return res.json(JSONResponse(tutorialResponse));
});

const getTutorials = asyncMiddleware(async (req, res) => {
    const filters = req.query;
    const tutorialResponse = await getTutorialsDB(filters)
    return res.json(JSONResponse(tutorialResponse));
});

const deleteTutorial = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const tutorialResponse = await deleteTutorialDB(id)
    return res.json(JSONResponse(tutorialResponse));
});

const updateTutorial = asyncMiddleware(async (req, res) => {
    const { id } = req.params;
    const tutorial = req.body;
    await updateTutorialDB(id, tutorial);
    return res.json(JSONResponse(`Tutorial ${id} updated.`));
});

const deleteTutorials = asyncMiddleware(async (req, res) => {
    const tutorialResponse = await deleteTutorialsDB()
    return res.json(JSONResponse(tutorialResponse));
});



module.exports = { addTutorial, getTutorial, deleteTutorial, updateTutorial, deleteTutorials, getTutorials}