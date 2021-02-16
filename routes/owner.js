const router = require("express").Router();
const Owner = require('../models/Owner');
const Project = require('../models/Project');


router.get("/owner", (req, res, next) => {
      const ownerId = req.session.user._id;
  Owner.findById(ownerId)
    .then(owner => {
      console.log('log from /owner: ', owner);
      res.render("owner", {owner});
  }).catch(err => {
      console.log(`error from get route /owner -->`, err);
  })
})

router.get("/owner/profile/:id/myprofile", (req, res, next) => {
  const ownerId = req.params.id;
  //console.log('owner session: ', ownerId)
Owner.findById(ownerId)
    .then(owner => {
      res.render("owner/profile/myprofile", {owner});
  }).catch(err => {
      console.log(`error from get route /owner/profile/myprofile -->`, err);
  })
})

router.get("/owner/profile/:id/edit", (req, res, next) => {
  const ownerId = req.params.id;
  Owner.findById(ownerId)
    .then(owner => {
      res.render("owner/profile/edit", {owner});
  }).catch(err => {
      console.log(`error from get route /owner/profile/:id/edit -->`, err);
    })
})

router.post("/owner/profile/:id/edit", (req, res, next) => {
  const ownerId = req.params.id;
  const {
    nameOrg,
    firstName,
    lastName,
    email,
    website,
    location,
    languages,
    description,
    category
  } = req.body;
  Owner.findByIdAndUpdate(ownerId, { 
    nameOrganisation: nameOrg,
    firstName,
    lastName,
    email,
    website,
    location,
    languages,
    description,
    category
  }).then(() => {
    res.redirect(`/owner/profile/${ownerId}/myprofile`);
  })
})

router.get("/owner/:id/projects/create", (req, res, next) => {
  const ownerId = req.params.id;
  //console.log(`ownerID: `, ownerId);
    res.render("owner/projects/create", {ownerId});
})

router.get("/owner/:id/projects/edit", (req, res, next) => {
  const ownerId = req.params.id;
  console.log('project id log:', ownerId)
  Project.findById(ownerId)
    .then(project => {
      res.render("owner/projects/edit", {project});
  })
})

router.post("/owner/:id/projects/edit", (req, res, next) => {
    const ownerId = req.params.id;
    res.render("owner/projects/edit", {ownerId});
})

//todo:
router.get("/owner/projects/myprojects", (req, res, next) => {
    res.render("owner/projects/myprojects");
})



module.exports = router;