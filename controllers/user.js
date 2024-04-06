const userService = require("../services/user");
const response = require("../helpers/response");

/**
 * TODO: Create a signup option as for now it's working with the exisitng users in the database from seed
 */
const userController = () => {

  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userData = await userService.login(email, password);

      return response.jsonSuccess(
        res,
        userData,
        "Successfully logged in user.",
        200
      );
    } catch (error) {
      return response.jsonError(res, error, error.message, 400);
    }
  };

  const loginView = async (req, res) => {
    res.render('login');
  };

  const dashboardView = async (req, res) => {
    res.render("dashboard");
  };

  return {
    login,
    loginView,
    dashboardView,
  };
};

module.exports = userController();
