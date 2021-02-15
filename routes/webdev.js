const router = require("express").Router();
const Developer = require('../models/Developer');

router.get("/webdev/profile/:id/myprofile", (req, res, next) => {
  Developer.findById(req.params.id)
    .then(developer => {
      res.render("webdev/profile/myprofile", { developer });
    })
    .catch(err => {
      console.log('Error while finding developer by id:', err);
      next();
    });
});

router.get("/webdev/", (req, res, next) => {
  res.render("webdev");
});

router.get("/webdev/profile/:id/edit", (req, res, next) => {
  Developer.findById(req.params.id)
    .then(developer => {
      //toDo: handle the selected values for location and language
      res.render("webdev/profile/edit", { developer });
    })
    .catch(err => {
      console.log('Error while finding developer by id:', err);
      next();
    });  
});

router.get("/webdev/myprojects", (req, res, next) => {
  res.render("webdev/myprojects");
});

router.post('/webdev/profile/:id/edit', (req, res, next) => {
  console.log(req.body);
  const { firstname,
          lastname,
          email,
          country,
          city,
          languages,
          stack,
          time,
          experience, 
          website,
          github} = req.body;

  Developer.findByIdAndUpdate(req.params.id, { firstname: firstname,
                                               lastname: lastname,
                                               email: email,
                                               country: country,
                                               city, city,
                                               languages: languages,
                                               stack: stack,
                                               time: time,
                                               experience, experience,
                                               website: website,
                                               github: github
                                               })
    .then(() => {
      res.redirect(`/webdev/profile/${req.params.id}/myprofile`);
    })
    .catch(err => {
      console.log("Error while finding a webdev by id and updating: ", err);
      next();
    });
});

module.exports = router;