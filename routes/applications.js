const router = require("express").Router();
const Developer = require('../models/Developer');
const Project = require('../models/Project');
const Owner = require('../models/Owner')


router.get("/apply/:projectID/:webdevID/", (req, res, next) => {
    Project.findByIdAndUpdate(req.params.projectID, 
        {
            "$push": { "applicants": req.params.webdevID },
            "$pull": { "rejected": req.params.webdevID }
        }, 
        {new: true}).then(project => {    
        res.redirect(`/webdev/${req.params.webdevID}/myprojects`);
    }).catch(err => {
        console.log('Error while finding a project by ID during application: ', err);
    })
});

router.post("/accept/:webdevID/:projectID", (req, res, next) => {
    Project.findByIdAndUpdate(req.params.projectID, 
        {
            "$push" : { "contributer": req.params.webdevID}, 
            "$pull" : { "applicants": req.params.webdevID},
             status: "running"
        },
        {new: true} )
    .then(project => {
        res.redirect(`/owner/${project.owner}/projects/myprojects`);
    }).catch(err => {
        console.log("Error while finding project by ID after accept: ", err);
    })
});


router.post("/reject/:webdevID/:projectID", (req, res, next) => {
    Project.findByIdAndUpdate(req.params.projectID, 
        {
            "$push" : { "rejected": req.params.webdevID},
            "$pull" : { "applicants": req.params.webdevID}
        },
        {new: true} )
    .then(project => {
        res.redirect(`/${project.owner}/projects-owner`)
    }).catch(err => {
        console.log("Error while finding project by ID after accept: ", err);
    })
});















module.exports = router;