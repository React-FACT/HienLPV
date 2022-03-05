const { ControllerConstant } = require('../constants/api.constant');
const {AppRouting} = require('../routes/app.routing');
const {AuthenticationRouting} = require('../routes/authentication.routing');
const {RoleRouting} = require('../routes/role.routing');

const registerController = (expr) => {
    expr.use(ControllerConstant.App, AppRouting);
    expr.use(ControllerConstant.Authentication, AuthenticationRouting);
    expr.use(ControllerConstant.Role, RoleRouting);
}

module.exports = {
    registerController
};