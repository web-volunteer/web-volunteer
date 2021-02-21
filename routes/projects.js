const router = require("express").Router();
const Project = require('../models/Project');
const Owner = require("./owner");

router.get("/:id/projects-owner", (req, res, next) => {
  const ownerId = req.params.id;
  console.log('ownerId', ownerId)
  Project.find()
    .populate('owner').populate('applicants')
    .lean()
    .then(projects => {
      projects.forEach(project => {
        if (project.owner._id == ownerId) {
          project.belongsToOwner = true;
          
        } else {
          project.belongsToOwner = false;
        }
        project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
      })   
      res.render("projects-owner", { ownerId: ownerId, projectList: projects });
    })
  
});

/* see all projects for project owner */
router.post("/:id/projects-owner", (req, res, next) => {
  const { title, description, status, time } = req.body;
  const ownerId = req.params.id;
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
  Project.findByIdAndUpdate(projectId, { title, description, status, time_per_week: time }).then((project) => {
    res.redirect(`/${project.owner}/projects-owner`)
  }).catch(err => {
      console.log('error in post route id/projects', err);
    })
})

/* Web Dev finding a project */
router.get("/webdev/:id/projects", (req, res, next) => {
  const webdevID = req.params.id;
  Project.find().populate('owner').then(projects => {

    projects.forEach(project => {
      if ( project.contributer.findIndex(obj => {return (obj == webdevID);}) == -1 
          && project.applicants.findIndex(obj => {return (obj == webdevID);}) == -1) 
      {
        project.displayApplyLink = true;
        
      } else 
      {
        project.displayApplyLink = false;
      }
      project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
  })
    res.render("projects-webdev", { projectList: projects, webdevID });
  }).catch(err => {
    console.log("Error while retrieving all the projects: ", err);
    next();
  })
});

/* Web Dev checking her projects */
  router.get("/webdev/:webdevID/myprojects", (req, res, next) => {
    const webdevID = req.params.webdevID;
    Project.find( {$or: [ {applicants: webdevID }, {contributer: webdevID}, {rejected: webdevID} ]} ).populate('owner').lean().then(projects => {
      projects.forEach(project => {
          if ( project.contributer.findIndex(obj => {return (obj == webdevID);}) !== -1 ) 
          {
            project.assignedToLoggedInWebDev = true;
          } else if( project.rejected.findIndex(obj => {return (obj == webdevID);}) !== -1)
          {
            project.loggedInWebDevRejected = true;
          } else
          {
              project.loggedInWebDevRejected = false;
              project.assignedToLoggedInWebDev = false;
          }
          project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
      })
      res.render("webdev/myprojects", {projectList: projects, webdevID})
    }).catch(err => {
      console.log("Error while getting projects by applicant ID: ", err);
    })
  });


  router.get("/owner/:ownerID/projects/myprojects", (req, res, next) => {
    const ownerID = req.params.ownerID;
    Project.find( { owner: ownerID } )
      .populate('owner').populate('applicants')
      .lean()
      .then(projects => {
        projects.forEach(project => {
          if (project.owner._id == ownerID) {
            project.belongsToOwner = true;
            
          } else {
            project.belongsToOwner = false;
          }
          project.time_per_week = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][project.time_per_week -1]
        })
        res.render("owner/projects/myprojects", { ownerId: ownerID, projectList: projects });
      })
})

module.exports = router;
