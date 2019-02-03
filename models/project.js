const Joi = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  created: {
    type: Number,
    minlength: 5,
    maxlength: 1024
  },
  manager: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  startdate: {
    type: Number,
    minlength: 5,
    maxlength: 1024,
    required: true
  },
  duedate: {
    type: Number,
    minlength: 5,
    maxlength: 1024,
    required: true
  }
});

const Project = mongoose.model("Project", projectSchema);

function validateProject(project) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    description: Joi.string()
      .min(5)
      .max(100)
      .required(),
    created: Joi.number()
      .min(5)
      .max(255),
    manager: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    startdate: Joi.number()
      .min(5)
      .required(),
    duedate: Joi.number()
      .min(5)
      .required()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
