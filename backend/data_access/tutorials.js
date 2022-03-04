const { Tutorial } = require('./data_access'); 

const createTutorialDB = (tutorial) => Tutorial.create(tutorial);

const getTutorialDB = (id) => Tutorial.findOne({ where : { id }});

const getTutorialsDB = (filters) => Tutorial.findAll({ where : { isDeleted: false }});

const deleteTutorialDB = (id) => Tutorial.update({ isDeleted: true, deletedAt: new Date()}, { where : { id }});

const updateTutorialDB = (id, tutorial) => Tutorial.update(tutorial, { where : { id }});

const deleteTutorialsDB = () => Tutorial.update({ isDeleted: true, deletedAt: new Date()}, { where : { isDeleted : false } });

module.exports = { createTutorialDB, getTutorialDB, getTutorialsDB, deleteTutorialDB, updateTutorialDB, deleteTutorialsDB }