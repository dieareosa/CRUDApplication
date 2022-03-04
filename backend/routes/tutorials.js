
const express = require('express');

const { addTutorial, getTutorial, getTutorials, deleteTutorial, updateTutorial, deleteTutorials } = require('../controllers/tutorials');
const router = express.Router();

router.route('/').post(addTutorial);

router.route('/').get(getTutorials);

router.route('/:id').get(getTutorial);

router.route('/:id').put(updateTutorial);

router.route('/mass_delete').delete(deleteTutorials);

router.route('/:id').delete(deleteTutorial);



module.exports = router;
