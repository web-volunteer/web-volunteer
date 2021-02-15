const router = require("express").Router();
const Project = require('../models/Project');

router.get("/projects", (req, res, next) => {
  //Project.find()
  res.render("projects");
});


router.post("/projects", (req, res, next) => {
  const { title, description, owner, status, time } = req.body;
  Project.create({
    title,
    description,
    owner,
    status,
    time_per_week: time 
  })
    .then(project => {
      res.render("projects", {project});
  })
});


module.exports = router;
