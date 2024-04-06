const jwt = require("jsonwebtoken");
const secret = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";
const userRepository = require("../repositories/user");

const userService = () => {
  const issueToken = (payload) => jwt.sign(payload, secret, { expiresIn: "7d" });
  const verifyToken = (token, cb) => jwt.verify(token, secret, {}, cb);

  const login = async (email, password) => {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      // We shouldn't specify which information is incorrect
      throw new Error("Email/Password is incorrect");
    }

    const isValidPass = await user.validatePassword(password);
    if (!isValidPass) {
      throw new Error("Email/Password is incorrect");
    }

    console.log('Login user: ', user)

    const token = issueToken({ id: user.id });

    return { user: user, token: token };
  }

  return {
    issueToken,
    verifyToken,
    login,
  };
};

module.exports = userService();
