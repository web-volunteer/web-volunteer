const router = require("express").Router();
const Owner = require('../models/Owner');
const Project = require('../models/Project');
const { uploader, cloudinary } = require('../config/cloundinary');


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

router.post("/owner/profile/:id/edit", uploader.single('photo'), (req, res, next) => {
  const ownerId = req.params.id;

  let imgPath = (req.file)? req.file.path : null;
  let imgName = (req.file)? req.file.originalname : null;
  let publicId = (req.file)? req.file.filename : null;

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
    // imgPath,
    // imgName,
    // publicId,
    website,
    location,
    languages,
    description,
    category
  }).then((owner) => {
      if(imgPath !== null) {
        Owner.findByIdAndUpdate(req.params.id, {
          imgPath: imgPath,
          imgName: imgName,
          publicId, publicId
        }).then(()=> {
          res.redirect(`/owner/profile/${ownerId}/myprofile`);;
        })
      } else {
        res.redirect(`/owner/profile/${ownerId}/myprofile`);
      }
    // res.redirect(`/owner/profile/${ownerId}/myprofile`);
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

router.get('/owner/:id/projects/delete', (req, res) => {
  const projectId = req.params.id;
  Project.findByIdAndRemove(projectId)
    .then((project) => {
    res.redirect(`/${project.owner}/projects-owner`);
  }).catch(err => {
      console.log(err);
    })
})





module.exports = router;