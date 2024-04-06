const Joi = require("joi");
/**
 * 
 * @returns next when the schema is validated or error if not
 * TODO: Separate each schema validator to their own validator files. IE. assessment etc
 */
const schemaValidator = () => {
  // TODO: add validator for assessment schema

  // Validate the user login schema
  const loginUserSchema = (req, res, next) => {
    const schema = Joi.object().keys({
      email: Joi.string().required().email().messages({
        "string.base": `"email" should be a type of 'email'`,
        "string.empty": `"email" cannot be an empty field`,
        "any.required": `"email" is a required field`,
      }),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .messages({
          "string.base": `"password" should be a type of 'text'`,
          "string.empty": `"password" cannot be an empty field`,
          "string.min": `"password" should have a minimum length of {#limit}`,
          "any.required": `"password" is a required field`,
        }),
    });
    validateRequest(req, res, next, schema);
  };

  const validateRequest = (req, res, next, schema) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({ message: error.message });
    } else {
      req.body = value;
      next();
    }
  };
  return {
    loginUserSchema,
  };
};

module.exports = schemaValidator();
