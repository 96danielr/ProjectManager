const { Sequelize, DataTypes } = require('sequelize');

//Establish db connection
const db = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'Dani9691*',
    port: '5432',
    database: 'ProjectManager',
    logging: false,
});

//export
module.exports = { db, DataTypes };
