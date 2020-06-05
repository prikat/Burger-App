var express = require("express");

// start up port connection to localhost
var PORT = process.env.PORT || 8000;
var app = express();

// enables access to static content of site
app.use(express.static("public"));

// middleware to parse data to be readable by express
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// import handlebar files
var exporthandlebars = require("express-handlebars");

// export handlebars to main.handlebars when rendering page
app.engine("handlebars", exporthandlebars({ defaultLayout: "main"}));

// tells express that the view engine will utilize handlebars
app.set("view engine", "handlebars");

// import controller entry point 
var routes = require("./controllers/burgers_controller.js");

// tells application to use routes defined in controller
app.use(routes);
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
})