const router = require("express").Router();

// router.get ('/owner/profile/myprofile')

router.get("/owner/profile/myprofile", (req, res, next) => {
  res.render("owner/profile/myprofile");
});



// router.get ('/owner/profile/edit')

// router.post ('/owner/profile/edit')

// router.get ('/owner/projects/create')

// router.get ('/owner/projects/edit')

// router.get ('/owner/projects/myprojects')



module.exports = router;