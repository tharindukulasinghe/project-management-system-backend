const Joi = require("joi");
const mongoose = require("mongoose");

const projectDocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  id: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  originalname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  savedname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
});

const ProjectDoc = mongoose.model(
  "ProjectDoc",
  projectDocSchema,
  "projectdocs"
);

function validateDoc(doc) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(100)
      .required(),
    id: Joi.string()
      .min(1)
      .max(100)
      .required(),
    originalname: Joi.string()
      .min(1)
      .max(255)
      .required(),
    savedname: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(doc, schema);
}

exports.ProjectDoc = ProjectDoc;
exports.validateDoc = validateDoc;
