import * as Joi from "joi";

const signupSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required(),
  last_name: Joi.string().min(2).max(50).required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  dob: Joi.date().iso().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]{6}$/)
    .optional(),
  otp_expires_at: Joi.date().optional(),
});

export default signupSchema;
