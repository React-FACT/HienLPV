const {BaseService} = require('./base/base.service');
const {RoleRepository} = require('../repositories/role.repository');
const logger = require('../logger/winston.logger');

class RoleService extends BaseService {
    _roleRepos;
    constructor(){
        let roleRepos= new RoleRepository();
        super(roleRepos);  
        this._roleRepos = roleRepos;     
        logger.info(`==================== constructor ${this.constructor.name}====================`); 
    }
}
module.exports = { RoleService }