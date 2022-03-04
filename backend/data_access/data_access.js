const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQLDB_DATABASE, process.env.MYSQLDB_USER, process.env.MYSQLDB_ROOT_PASSWORD,
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    });

const Tutorial = sequelize.define('tutorial', {
    title: { type: Sequelize.STRING, allowNull: false },
    publishedStatus: { type: Sequelize.STRING, allowNull: false },
    videoUrl: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    isDeleted : { type: Sequelize.BOOLEAN, defaultValue: false },
    deletedAt: { type: Sequelize.DATE }
});


sequelize.sync();

module.exports = { Tutorial }
