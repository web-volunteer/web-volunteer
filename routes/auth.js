const router = require("express").Router();
const Developer = require('../models/Developer');
const Owner = require('../models/Owner');
const bcrypt = require('bcrypt');

// signup webdev
router.get("/signup/webdev", (req, res, next) => {
  res.render("signup", { webdev: 'true' });
});

// signup owner
router.get("/signup/owner", (req, res, next) => {
    res.render("signup", { owner: 'true' });
});
  
// login
router.get("/login", (req, res, next) => {
  res.render("login");
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  Developer.findOne({ username: username })
    .then(devFromDB => {
      Owner.findOne({ username: username })
         .then(ownerFromDB => {
            if (devFromDB === null && ownerFromDB === null) {
                // if username does not exist as developer or owner
                res.render('login', { message: 'Invalid credentials' });
                return;
            } else if (devFromDB !== null) {
                // username exists as a developer
                if (bcrypt.compareSync(password, devFromDB.password)) {
                    req.session.user = devFromDB;
                    res.render('webdev/index.hbs', { webdev: devFromDB });
                  } else {
                    res.render('login', { message: 'Invalid credentials' });
                  } 
            } else {
                // username exists as an owner
                if (bcrypt.compareSync(password, ownerFromDB.password)) {
                  req.session.user = ownerFromDB;
                  console.log('owner: ', ownerFromDB)
                    res.redirect('/owner');
                  } else {
                    res.render('login', { message: 'Invalid credentials' });
                  } 
            }
            // Assumption: username cannot be both a developer and owner. 
            // ToDo: Prevent this in signup by checking both collections
         })
    })

})


// the Webdev signup form posts to this route
router.post('/signupWebDev', (req, res) => {
  console.log("Webdev post is triggered")
  const { username, password } = req.body;
  console.log(username, password);
  if (password.length < 8) {
    return res.render('signup', { message: 'Your password has to be minimum 8 characters long.' });
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' });
    return
  }
  Developer.findOne({ username: username })
    .then(devFromDB => {
      if (devFromDB !== null) {
        res.render('signup', { message: 'Username is already taken. Please choose a different one.' });
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt)
        Developer.create({ username: username, password: hash })
          .then(devFromDB => {
            console.log(devFromDB);
            res.redirect('/login');
          })
      }
    })
    .catch(err => {
      console.log(err);
    })
});

// the Owner signup form posts to this route
router.post('/signupOwner', (req, res) => {
    console.log("Owner post is triggered")
    const { username, password } = req.body;
    console.log(username, password);
    if (password.length < 8) {
      return res.render('signup', { message: 'Your password has to be minimum 8 characters long.' });
    }
    if (username === '') {
      res.render('signup', { message: 'Your username cannot be empty' });
      return
    }
    Owner.findOne({ username: username })
      .then(ownerFromDB => {
        if (ownerFromDB !== null) {
          res.render('signup', { message: 'Username is already taken. Please choose a different one.' });
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)
          Owner.create({ username: username, password: hash })
            .then(ownerFromDB => {
              console.log(ownerFromDB);
              res.redirect('/login');
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  });

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;