const { BaseEntity } = require('./bases/base.entity');
const { Sequelize } = require('sequelize');

class Authentication extends BaseEntity {
  username = { type: Sequelize.STRING(50) };
  password = { type: Sequelize.STRING(50) };
  firstName = { type: Sequelize.STRING(50) };
  lastName = { type: Sequelize.STRING(50) };
  email = { type: Sequelize.STRING(50) };
  address = { type: Sequelize.STRING(250) };
  note = { type: Sequelize.STRING(250) };
  roleId = { type: Sequelize.INTEGER };
  actived = { type: Sequelize.INTEGER };
}
module.exports = { Authentication };
