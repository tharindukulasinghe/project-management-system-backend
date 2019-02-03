const { Project, validate } = require("../models/project");
const { ProjectRole } = require("../models/projectRole");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

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

  projectRole = new ProjectRole({
    name: req.body.name,
    email: req.body.manager,
    role: "Project Manager",
    project: {
      name: req.body.name,
      description: req.body.description,
      created: Date.now(),
      manager: req.body.manager,
      startdate: req.body.startdate,
      duedate: req.body.duedate
    }
  });
  await project.save();
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

module.exports = router;
