const router = require("express").Router();
const Developer = require('../models/Developer');
const Project = require('../models/Project');
const Owner = require('../models/Owner')


router.get("/apply/:projectID/:webdevID/", (req, res, next) => {
    console.log(`Hi! from the application process! Webdev with id ${req.params.webdevID} is applying to project with id ${req.params.projectID}`);
    Project.findByIdAndUpdate(req.params.projectID, {"$push": { "applicants": req.params.webdevID } }, {new: true}).then(project => {
        //project.applicants.push(req.params.webdevID);
        res.redirect(`/webdev/${req.params.webdevID}/myprojects`);
        console.log('This project now has an extra applicant: ', project);
    }).catch(err => {
        console.log('Error while finding a project by ID during application: ', err);
    })
});

router.post("/accept/:webdevID/:projectID", (req, res, next) => {
    console.log("Accept");
    console.log(req.params.webdevID);
    Project.findByIdAndUpdate(req.params.projectID, {"$push" : { "contributer": req.params.webdevID}, "$pull" : { "applicants": req.params.webdevID} }, {new: true} )
    .then(project => {
        console.log(project);
    }).catch(err => {
        console.log("Error while finding project by ID after accept: ", err);
    })
});




router.post("/reject/:webdevID/:projectID", (req, res, next) => {
    console.log("reject");
});















module.exports = router;