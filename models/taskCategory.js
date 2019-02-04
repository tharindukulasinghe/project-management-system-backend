const Joi = require("joi");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  projectId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100
  }
});

const Category = mongoose.model("Category", categorySchema, "categories");

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    projectId: Joi.string()
      .min(5)
      .max(100)
      .required()
  };

  return Joi.validate(category, schema);
}

exports.Category = Category;
exports.validate = validateCategory;
