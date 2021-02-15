const router = require("express").Router();
const Project = require('../models/Project');

router.get("/projects", (req, res, next) => {
  Project.find()
    .then(projects => {
      //console.log(`logging all projects:`, projects)
      res.render("projects", {projectList: projects});
  })
});

//to-do: display owner id and time correctly
router.post("/projects", (req, res, next) => {
  const { title, description, owner, status, time } = req.body;
  Project.create({
    title,
    description,
    owner,
    status,
    time_per_week: time 
  })
    .then(() => {
      console.log(`post projects log: `, req.body);
      res.redirect("/projects");
  })
});


module.exports = router;
