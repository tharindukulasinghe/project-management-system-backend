const { Project, validate } = require("../models/project");
const { ProjectRole } = require("../models/projectRole");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const nodemailer = require("nodemailer");
const { Category, validate: taskValidate } = require("../models/taskCategory");
const { ProjectTask, validateProjectTask } = require("../models/projectTasks");
const { ProjectCols } = require("../models/projectCols");

router.post("/newproject", async (req, res) => {
  console.log("hi");
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let project = await ProjectRole.findOne({ name: req.body.name });

  if (project) {
    return res
      .status(400)
      .send(
        `You already have project name ${
          project.name
        }. Please choose a different name.`
      );
  }

  project = new Project({
    name: req.body.name,
    description: req.body.description,
    created: Date.now(),
    manager: req.body.manager,
    startdate: req.body.startdate,
    duedate: req.body.duedate
  });

  await project.save();

  projectRole = new ProjectRole({
    name: req.body.name,
    email: req.body.manager,
    role: "Project Manager",
    id: project._id,
    project: {
      name: req.body.name,
      description: req.body.description,
      created: Date.now(),
      manager: req.body.manager,
      startdate: req.body.startdate,
      duedate: req.body.duedate
    }
  });

  await projectRole.save();

  res
    .status(200)
    .send(
      _.pick(project, [
        "name",
        "description",
        "manager",
        "_id",
        "startdate",
        "duedate"
      ])
    );
});

router.get("/getByemail", async (req, res) => {
  //console.log("kk");
  //console.log(req.query.email);
  let projects = await ProjectRole.find({ email: req.query.email });
  res.status(200).send(projects);
});

router.get("/getCategories", async (req, res) => {
  //console.log("kk");
  let categories = await Category.find({ projectId: req.query.id });
  res.status(200).send(categories);
});

router.get("/getProjectTasks", async (req, res) => {
  //console.log("kk");
  let tasks = await ProjectTask.find({ projectId: req.query.id });
  res.status(200).send(tasks);
});

router.post("/newcategory", async (req, res) => {
  console.log("hi");
  const { error } = taskValidate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let category = await Category.findOne({ name: req.body.name });

  if (category) {
    return res
      .status(400)
      .send(`You already have category name ${category.name}.`);
  }

  category = new Category({
    name: req.body.name,
    projectId: req.body.projectId
  });

  await category.save();

  res.status(200).send(_.pick(category, ["name", "projectId", "_id"]));
});

router.post("/newProjectTask", async (req, res) => {
  console.log("hi hihihih");
  const { error } = validateProjectTask({ ...req.body, created: Date.now() });

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  projectTask = new ProjectTask({
    title: req.body.title,
    projectId: req.body.projectId,
    description: req.body.description,
    category: req.body.category,
    assingedPersons: [],
    created: Date.now()
  });

  await projectTask.save();

  res
    .status(200)
    .send(_.pick(projectTask, ["title", "projectId", "_id", "description"]));
});

router.get("/inviteCol", async (req, res) => {
  //console.log("kk");
  let id = req.query.projectId;
  let email = req.query.email;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "itfacproject@gmail.com",
      pass: "tharindu123"
    }
  });

  const mailOptions = {
    from: "itfacproject@gmail.com", // sender address
    to: `${email}`, // list of receivers
    subject: "You are Invited", // Subject line
    html: `<html> <a href="http://localhost:3000/api/projects/inviteCol?projectId=${id}&email=${email}">Follow this link to accept invitation.</a></html>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
});

router.get("/acceptInvite", async (req, res) => {
  //console.log("kk");

  let id = req.query.projectId;
  let email = req.query.email;

  let result = await ProjectCols.findOneAndUpdate(
    { projectId: id },
    { $push: { cols: email } },
    { upsert: true }
  );
  console.log(result);
  res.status(200).send("success");
});

module.exports = router;
