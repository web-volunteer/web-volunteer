const router = require("express").Router();
const Developer = require('../models/Developer');
const Project = require('../models/Project');
const { uploader, cloudinary } = require('../config/cloundinary');


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
  const webdevID = req.session.user._id;
  Developer.findById(webdevID)
    .then(developer => {
    res.render("webdev", {webdev: developer});
  }).catch(err => {
      console.log(`error from get route /webdev -->`, err);
  })
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

router.post('/webdev/profile/:id/edit', uploader.single('photo'), (req, res, next) => {
  console.log(req.file);
  let imgPath = (req.file)? req.file.path : null;
  let imgName = (req.file)? req.file.originalname : null;
  let publicId = (req.file)? req.file.filename : null;
  // let imgPath = req.file.path;
  // let imgName = req.file.originalname;
  // let publicId = req.file.filename;

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
                                              //  imgPath: imgPath,
                                              //  imgName: imgName,
                                              //  publicId, publicId,
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
    .then((developer) => {
      if(imgPath !== null) {
        Developer.findByIdAndUpdate(req.params.id, {
          imgPath: imgPath,
          imgName: imgName,
          publicId, publicId
        }).then(()=> {
          res.redirect(`/webdev/profile/${req.params.id}/myprofile`);
        })
      } else {
        res.redirect(`/webdev/profile/${req.params.id}/myprofile`);
      }
    })
    .catch(err => {
      console.log("Error while finding a webdev by id and updating: ", err);
      next();
    });
});


module.exports = router;