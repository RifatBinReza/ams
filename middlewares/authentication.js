const userService = require("../services/user");

const authentication = () => {
  // TODO: We need to handle authorisation here with role type so that students cannot access admin info
  const verifyToken = (req, res, next) => {
    // Parse the token from the request or return error
    const token = getToken(req, res);

    if (!token) {
      return res.status(401).json({ msg: "No Authorization was found" });
    }

    return userService.verifyToken(token, (error, decoded) => {
      if (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
      } else {
        return next();
      }
    });
  };

  /**
   * This function will look for the token in different places and return it
   */
  const getToken = (req, res) => {
    let tokenToVerify = null;

    if (req.header("Authorization")) {
      const parts = req.header("Authorization").split(" ");

      if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/.test(scheme)) {
          tokenToVerify = credentials;
        }
      }
    } else if (req.body.token) {
      tokenToVerify = req.body.token;
    } else if (req.query.token) {
      tokenToVerify = req.query.token
    }
    return tokenToVerify
  };

  return {
    verifyToken,
  };
};

module.exports = authentication();
