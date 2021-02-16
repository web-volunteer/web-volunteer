const router = require("express").Router();
const Developer = require('../models/Developer');
const Project = require('../models/Project');


router.get("/webdev/profile/:id/myprofile", (req, res, next) => {
  Developer.findById(req.params.id)
    .then(developer => {
      developer.time = ['<5hrs/week', '5-10hrs/week', '>10hrs/week'][developer.time - 1]
      developer.experience = ['< 1 year', '1-5 years', '> 5 years'][developer.experience - 1]
      developer.stack = developer.stack.join(', ');
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
      //developer.stack = developer.stack.join(', ');
      
      /* should be in the same order of values as the experience enum in Developer model */
      const devExperience = { lessthan1year: false, onetofiveyears: false, morethan5: false}
      let expKeys = Object.keys(devExperience);
      devExperience[expKeys[developer.experience - 1]] = true;

      /* should be in the same order of values as the time enum in Developer model */
      const devAvailability = { lessthan5hrs: false, fivetotenhrs: false, morethan10hrs: false}
      let availKeys = Object.keys(devAvailability);
      devAvailability[availKeys[developer.time - 1]] = true;

      res.render("webdev/profile/edit", { developer, devExperience, devAvailability });
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
          primarylanguage,
          secondarylanguage,
          stack,
          time,
          experience, 
          website,
          github,
          description } = req.body;

  Developer.findByIdAndUpdate(req.params.id, { firstname: firstname,
                                               lastname: lastname,
                                               email: email,
                                               country: country,
                                               city, city,
                                               primarylanguage: primarylanguage,
                                               secondarylanguage: secondarylanguage,
                                               stack: stack.split(',').map(element => {return element.trim()}),
                                               time: time,
                                               experience, experience,
                                               website: website,
                                               github: github,
                                               description: description
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