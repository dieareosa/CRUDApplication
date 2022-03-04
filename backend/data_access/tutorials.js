const { Tutorial } = require('./data_access'); 
const saveTutorial = (tutorial) =>  Tutorial.create(tutorial);

module.exports = { saveTutorial }