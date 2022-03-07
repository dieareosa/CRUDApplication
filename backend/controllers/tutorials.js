const asyncMiddleware = require('../middlewares/async');
const JSONResponse = require('../utils/custom_response');
const {isValidAddTutorialRequest, isValidIdRequest, isValidUpdateTutorialRequest} = require('../validators/tutorials');
const {createTutorialDB, getTutorialDB, getTutorialsDB, deleteTutorialDB, updateTutorialDB, deleteTutorialsDB} = require('../data_access/tutorials');
const {verifyToken} = require('../lib/token_generator');

const addTutorial = asyncMiddleware(async (req, res) => {
    await verifyToken(req, res);
    const tutorial = req.body;

    const {successful, message} = isValidAddTutorialRequest(tutorial);

    if (!successful) return res.status(400).json(JSONResponse(message));

    const tutorialResponse = await createTutorialDB(tutorial);
    return res.json(JSONResponse(tutorialResponse));
});

const getTutorial = asyncMiddleware(async (req, res) => {
    const {id} = req.params;

    const {successful, message} = isValidIdRequest(id);

    if (!successful) return res.status(400).json(JSONResponse(message));

    const tutorialResponse = await getTutorialDB(id);
    return res.json(JSONResponse(tutorialResponse));
});

const getTutorials = asyncMiddleware(async (req, res) => {
    const {filter} = req.query;

    const tutorialResponse = await getTutorialsDB(filter);
    return res.json(JSONResponse(tutorialResponse));
});

const deleteTutorial = asyncMiddleware(async (req, res) => {
    const {id} = req.params;

    const {successful, message} = isValidIdRequest(id);

    if (!successful) return res.status(400).json(JSONResponse(message));

    const tutorialResponse = await deleteTutorialDB(id);
    return res.json(JSONResponse(tutorialResponse));
});

const updateTutorial = asyncMiddleware(async (req, res) => {
    const {id} = req.params;
    const tutorial = req.body;

    const {successful, message} = isValidUpdateTutorialRequest(id, tutorial);

    if (!successful) return res.status(400).json(JSONResponse(message));

    await updateTutorialDB(id, tutorial);
    return res.json(JSONResponse(`Tutorial ${id} updated.`));
});

const deleteTutorials = asyncMiddleware(async (req, res) => {
    const tutorialResponse = await deleteTutorialsDB();
    return res.json(JSONResponse(tutorialResponse));
});


module.exports = {addTutorial, getTutorial, deleteTutorial, updateTutorial, deleteTutorials, getTutorials};