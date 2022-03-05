const { AuthenticationService } = require('../services/authentication.service');
const authenticationService = new AuthenticationService();

const authGetAll = async (req, res) => {
  const response = await authenticationService.getAll();
  res.json(response.results);
};

const authGetById = (req, res) => {
  res.json(authenticationService.getById(req.params.id));
};

module.exports = {
  authGetAll,
  authGetById,
};
