const Joi = require("joi");
const mongoose = require("mongoose");

var assingedPerson = new mongoose.Schema({ name: String, email: String });
const projectTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  projectId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  category: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  assingedPersons: [assingedPerson],
  created: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 50,
    required: true
  }
});

const ProjectTask = mongoose.model(
  "ProjectTask",
  projectTaskSchema,
  "projecttasks"
);

function validate(projectTask) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(50)
      .required(),
    projectId: Joi.string()
      .min(5)
      .max(100)
      .required(),
    description: Joi.string()
      .min(5)
      .max(50)
      .required(),
    category: Joi.string()
      .min(1)
      .max(50)
      .required(),
    created: Joi.number()
      .min(1)
      .required()
  };

  return Joi.validate(projectTask, schema);
}

exports.ProjectTask = ProjectTask;
exports.validateProjectTask = validate;
