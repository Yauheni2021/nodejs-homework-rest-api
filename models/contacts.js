const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-z]+)$/;
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    unique: true,
    mattch: emailRegex,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    mattch: phoneRegex,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
},
{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

const joiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().pattern(emailRegex).required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  joiSchema,
  favoriteJoiSchema
}

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};

