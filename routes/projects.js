const router = require("express").Router();
const Project = require('../models/Project');
const { get } = require("./owner");

//under construction: now adding populate to display owner
router.get("/:id/projects-owner", (req, res, next) => {
  const ownerId = req.params.id;
  console.log('ownerId', ownerId)
  Project.find()
    .populate('owner').populate('applicants')
    .lean()
    .then(projects => {
      projects.forEach(project => {
        console.log(project)
        //console.log(typeof project.owner)
        if (project.owner._id == ownerId) {
          project.belongsToOwner = true;
          
        } else {
          project.belongsToOwner = false;
        }
        project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
      })
      // console.log('projects log: ', projects)
      
      res.render("projects-owner", { ownerId: ownerId, projectList: projects });
    })
  
});

/* see all projects for project owner */
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

/* Web Dev finding a project */
router.get("/webdev/:id/projects", (req, res, next) => {
  const webdevID = req.params.id;
  console.log('Hello webdev! Your ID is : ', webdevID);
  console.log(typeof webdevID)
  Project.find().populate('owner').then(projects => {
    // console.log(projects);
    res.render("projects-webdev", { projectList: projects, webdevID });
  }).catch(err => {
    console.log("Error while retrieving all the projects: ", err);
    next();
  })
});

/* Web Dev checking her projects */
  router.get("/webdev/:webdevID/myprojects", (req, res, next) => {
    console.log('Webdev needs to check her projects!');
    const webdevID = req.params.webdevID;
    Project.find( {$or: [ {applicants: webdevID }, {contributer: webdevID} ]} ).populate('owner').lean().then(projects => {
      projects.forEach(project => {
          // console.log("webdev ID: ", typeof webdevID);
          // console.log("index of thing: ", project.contributer.indexOf(webdevID));
          // console.log(typeof project.contributer[0])
          // if (project.contributer.indexOf(webdevID) !== -1) {
          //   project.assignedToLoggedInWebDev = true;
            
          // } else {
          //   project.assignedToLoggedInWebDev = false;
          // }
          // console.log("hey: ", project.contributer.findIndex(obj => {
          //   return (obj == webdevID);
          // }))
          if ( project.contributer.findIndex(obj => {return (obj == webdevID);}) !== -1 ) 
          {
            project.assignedToLoggedInWebDev = true;
            
          } else 
          {
            project.assignedToLoggedInWebDev = false;
          }
          project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
      })
      console.log(projects);
      res.render("webdev/myprojects", {projectList: projects, webdevID})
    }).catch(err => {
      console.log("Error while getting projects by applicant ID: ", err);
    })
  });

module.exports = router;
