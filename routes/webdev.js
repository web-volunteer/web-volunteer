const router = require("express").Router();

router.get("/webdev/profile/myprofile", (req, res, next) => {
  res.render("webdev/profile/myprofile");
});

router.get("/webdev/", (req, res, next) => {
  res.render("webdev");
});

router.get("/webdev/profile/edit", (req, res, next) => {
  res.render("webdev/profile/edit");
});

router.get("/webdev/myprojects", (req, res, next) => {
  res.render("webdev/myprojects");
});

module.exports = router;