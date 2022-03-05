const {BaseEntity} = require('./bases/base.entity');
const { Sequelize } = require('sequelize');

class Role extends BaseEntity{
    name = { type: Sequelize.STRING(50) };
}
module.exports = {Role}