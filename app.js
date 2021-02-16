// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const path = require("path");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();


// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);


// session configuration
const session = require('express-session');
// session store using mongo
const MongoStore = require('connect-mongo')(session)

const mongoose = require('./db/index');

app.use(
    session({
        secret: 'keyboard cat', //process.env.SESSION_SECRET,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        saveUninitialized: false,
        //Forces the session to be saved back to the session store, 
        // even if the session was never modified during the request.
        resave: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
)
// end of session configuration

// default value for title local
const projectName = "web-volunteer";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with IronGenerator`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const owner = require("./routes/owner");
app.use("/", owner);

const webdev = require("./routes/webdev");
app.use("/", webdev);

const projects = require("./routes/projects");
app.use("/", projects);

const applications = require("./routes/applications");
app.use("/", applications);

const auth = require("./routes/auth");
app.use("/", auth);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
