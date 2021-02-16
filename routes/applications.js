const router = require("express").Router();
const Developer = require('../models/Developer');
const Project = require('../models/Project');
const Owner = require('../models/Owner')


router.get("/apply/:projectID/:webdevID/", (req, res, next) => {
    console.log(`Hi! from the application process! Webdev with id ${req.params.webdevID} is applying to project with id ${req.params.projectID}`);
});




















module.exports = router;