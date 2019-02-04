const Joi = require("joi");
const mongoose = require("mongoose");

const projectColsSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  },
  cols: {
    type: [String],
    required: true
  }
});

const ProjectCols = mongoose.model(
  "ProjectCols",
  projectColsSchema,
  "projectcols"
);

exports.ProjectCols = ProjectCols;
