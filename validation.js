// handle register/login/course validation

const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    // describe how the input should look like
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor"), //.valid() means the user input can only be either of them
  });

  return schema.validate(data); //returns an object that contains the validation result
  /* The returned validation result object typically has two properties: error and value. If there are validation errors, the error property will contain an object with details about the validation failures. If the validation succeeds without errors, the error property will be null, and the value property will contain the validated data. */
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(9999).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
