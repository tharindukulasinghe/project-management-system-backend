const Joi = require("joi");
const mongoose = require("mongoose");

const projectRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  role: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  id: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  project: {
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
  }
});

const ProjectRole = mongoose.model(
  "ProjectRole",
  projectRoleSchema,
  "projectroles"
);

exports.ProjectRole = ProjectRole;
