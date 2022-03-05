const {BaseRepository} = require('./base/base.repository');
const { Role } = require('../entities/role.entity');
const logger = require('../logger/winston.logger');

class RoleRepository extends BaseRepository{
    _role;
    constructor(){       
        let role = new Role();
        super(role);
        this._role = role;
        logger.info(`==================== constructor ${this.constructor.name}====================`);
    }
}
module.exports = {RoleRepository}