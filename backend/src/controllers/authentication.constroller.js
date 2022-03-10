const { AuthenticationService } = require('../services/authentication.service');
const authenticationService = new AuthenticationService();

const authGetAll = async (req, res) => {
  res.json(await authenticationService.getAll());
};

const authGetById = async (req, res) => {
  res.json(await authenticationService.getById(req.params.id));
};

const create = async (req, res) => {
  res.json(await authenticationService.create(req.body));
};

const update = async (req, res) => {
  res.json(
    await authenticationService.update(parseInt(req.params.id), req.body)
  );
};

const remove = async (req, res) => {
  res.json(await authenticationService.delete(req.params.id));
};

module.exports = {
  authGetAll,
  authGetById,
  create,
  remove,
  update,
};
