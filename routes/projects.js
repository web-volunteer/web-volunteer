const router = require("express").Router();

router.get("/projects", (req, res, next) => {
  res.render("projects");
});


router.post("/projects", (req, res, next) => {
    // need Owner model to create a project
  res.redirect("/projects");
});


module.exports = router;
