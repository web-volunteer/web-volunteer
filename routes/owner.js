const router = require("express").Router();

// router.get ('/owner/profile/myprofile')

router.get("/owner/profile/myprofile", (req, res, next) => {
  res.render("owner/profile/myprofile");
});

//need Owner model to complete this:
/* router.get("/owner/profile/:id", (req, res, next) => {
    const ownerId = req.params.id;
  res.render("owner/profile/myprofile");
}); */

// router.get ('/owner/profile/edit')
router.get("/owner/profile/edit", (req, res, next) => {
  res.render("owner/profile/edit");
});


router.get("/owner/projects/create", (req, res, next) => {
    res.render("owner/projects/create");
})

router.get("/owner/projects/edit", (req, res, next) => {
    res.render("owner/projects/edit");
})

router.get("/owner/projects/myprojects", (req, res, next) => {
    res.render("owner/projects/myprojects");
})



module.exports = router;