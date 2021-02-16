const router = require("express").Router();
const Project = require('../models/Project');

router.get("/:id/projects-owner", (req, res, next) => {
  const ownerId = req.params.id;
  console.log('owner id:', ownerId);
  Project.find()
    .then(projects => {
      
      //console.log(`logging all projects:`, projects)
      projects.forEach(project => {
        
        if (project.owner === ownerId) {
          project.belongsToOwner = true;
        } else {
          project.belongsToOwner = false;
        }
        console.log('logging the new project', project)
      })
      res.render("projects-owner", {projectList: projects, ownerId});
  })
});

//to-do: display time correctly
router.post("/:id/projects-owner", (req, res, next) => {
  const { title, description, status, time } = req.body;
  const ownerId = req.params.id;
  console.log(`post req body log: `, req.body);
  Project.create({
    title,
    description,
    status,
    time_per_week: time,
    owner: ownerId,
  })
    .then(() => {
      console.log(`post projects log: `, req.body);
      res.redirect(`/${ownerId}/projects-owner`);
  })
});


module.exports = router;
