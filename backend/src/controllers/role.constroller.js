const { RoleService } = require('../services/role.service');
const _roleService = new RoleService();
const logger = require('../logger/winston.logger');

const getAll = (async (req, res) => {
    res.json(await _roleService.getAll());
});

const getById = (async (req, res) => {
    res.json(await _roleService.getById(req.params.id));
});

const create = (async (req, res) => {
    res.json(await _roleService.create(req.body));
});

const update = (async (req, res) => {
    res.json(await _roleService.update(parseInt(req.params.id), req.body));
});

const remove = ((req, res) => {
    res.json(_roleService.delete(req.params.id));
});

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}