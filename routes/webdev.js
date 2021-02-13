const router = require("express").Router();

router.get("/webdev/profile/myprofile", (req, res, next) => {
  res.render("webdev/profile/myprofile");
});

module.exports = router;