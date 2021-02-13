const router = require("express").Router();
//const Developr = require('../models/Developer.model');
//const Owner = require('../models/Owner.model');
const bcrypt = require('bcrypt');

// signup webdev
router.get("/signup/webdev", (req, res, next) => {
  res.render("signupWebDev");
});

// signup owner
router.get("/signup/owner", (req, res, next) => {
    res.render("signupOwner");
});
  
// login
router.get("/login", (req, res, next) => {
  res.render("login");
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // check if we have a user with the entered username
  Developer.findOne({ username: username })
    .then(devFromDB => {
      Owner.findOne({ username: username })
         .then(ownerFromDB => {
            if (devFromDB === null && ownerFromDB === null) {
                // if username does not exist as developer or owner
                res.render('login', { message: 'Invalid credentials' });
                return;
            } else if (devFromDB !== null) {
                // username exist as a developer
                if (bcrypt.compareSync(password, devFromDB.password)) {
                    req.session.user = devFromDB;
                    res.redirect('/webdev');
                  } else {
                    res.render('login', { message: 'Invalid credentials' });
                  } 
            } else {
                // username exist as an owner
                if (bcrypt.compareSync(password, ownerFromDB.password)) {
                    req.session.user = devFromDB;
                    res.redirect('/webdev');
                  } else {
                    res.render('login', { message: 'Invalid credentials' });
                  } 
            }
            //Assumption: username cannot be both a developer and owner. To be checked in Signup
         })
    })

})

// the Webdev signup form posts to this route
router.post('/signupWebDev', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (password.length < 8) {
    return res.render('signup', { message: 'Your password has to be 8 chars min' });
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
    return
  }
  Developer.findOne({ username: username })
    .then(devFromDB => {
      if (devFromDB !== null) {
        res.render('signup', { message: 'Username is already taken' });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt)
        Developer.create({ username: username, password: hash })
          .then(devFromDB => {
            console.log(devFromDB);
            res.redirect('/');
          })
      }
    })
    .catch(err => {
      console.log(err);
    })
})

// the Owner signup form posts to this route
router.post('/signupOwner', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (password.length < 8) {
      return res.render('signup', { message: 'Your password has to be 8 chars min' });
    }
    if (username === '') {
      res.render('signup', { message: 'Your username cannot be empty' });
      return
    }
    Owner.findOne({ username: username })
      .then(ownerFromDB => {
        if (ownerFromDB !== null) {
          res.render('signup', { message: 'Username is already taken' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Owner.create({ username: username, password: hash })
            .then(ownerFromDB => {
              console.log(ownerFromDB);
              res.redirect('/');
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  })

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;