const {Tutorial} = require('./data_access');
const {Op} = require('sequelize');

const createTutorialDB = (tutorial) => Tutorial.create(tutorial);

const getTutorialDB = (id) => Tutorial.findOne({where: {id}});

const getTutorialsDB = (filter = '') => {
    const searchFilter = {[Op.like]: `%${filter}%`};
    const where = {
        isDeleted: false,
        [Op.or]: [{title: searchFilter}, {description: searchFilter}]
    };

    return Tutorial.findAll({where});
};


const deleteTutorialDB = (id) => Tutorial.update({isDeleted: true, deletedAt: new Date()}, {where: {id}});

const updateTutorialDB = (id, tutorial) => Tutorial.update(tutorial, {where: {id}});

const deleteTutorialsDB = () => Tutorial.update({isDeleted: true, deletedAt: new Date()}, {where: {isDeleted: false}});

module.exports = {createTutorialDB, getTutorialDB, getTutorialsDB, deleteTutorialDB, updateTutorialDB, deleteTutorialsDB};