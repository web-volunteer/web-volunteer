const router = require("express").Router();
const Project = require('../models/Project');
const { get } = require("./owner");

router.get("/:id/projects-owner", (req, res, next) => {
  const ownerId = req.params.id;
  console.log('ownerId', ownerId)
  Project.find()
    .lean()
    .then(projects => {
      projects.forEach(project => {
        //console.log(typeof ownerId)
        //console.log(typeof project.owner)
        if (project.owner == ownerId) {
          project.belongsToOwner = true;

        } else {
          project.belongsToOwner = false;
        }
      })
      res.render("projects-owner", { ownerId: ownerId, projectList: projects });
  })
});

//to-do: display time correctly
router.post("/:id/projects-owner", (req, res, next) => {
  const { title, description, status, time } = req.body;
  const ownerId = req.params.id;
  //console.log(`post route req body log: `, req.body);
  Project.create({
    title,
    description,
    status,
    time_per_week: time,
    owner: ownerId,
  })
    .then(() => {
      res.redirect(`/${ownerId}/projects-owner`);
  })
});


router.post("/:id/projects", (req, res, next) => {
  const projectId = req.params.id;
    const { title, description, status, time } = req.body;
    console.log('logging project id:', projectId)
  Project.findByIdAndUpdate(projectId, { title, description, status, time_per_week: time }).then((project) => {
    res.redirect(`/${project.owner}/projects-owner`)
  }).catch(err => {
      console.log('error in post route id/projects', err);
    })
})



module.exports = router;
