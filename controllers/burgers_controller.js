var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

// get route to display home route
router.get("/", function(req,res) {
    // route accesses burger model to obtain data it needs
    burger.selectAll(function(data) {
        // declaring an object that will be used by index.handlebars to render HTML
        var burgerObject = {
            // setting burgers object that will be used in index.handlebar
            burgers: data
        };
        console.log(burgerObject);
        // rendering html with data from burgerObject
        return  res.render("index", burgerObject);
    });
});

// post route to insert row in burger table
router.post("/api/burgers", (req, res) => {
    // using burger model to set the properties of the new burger object based on user input
    burger.insertOne(["burger_name", "devoured"
        ], [
            // set burger name and devoured properties to req.body
            req.body.burger_name, req.body.devoured
        ], 
        // json the response and set the id equal to the insert id of the row entry
        function(result) {
            res.json({ id: result.insertId});
        });
});

// update burger row by id parameter
router.put("/api/burgers/:id", (req,res) => {
    // declare location of entry to be updated 
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    // using burger model to set devoured property for the specified id
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        // if no rows updated, return 404 error
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            // success
            res.status(200).end();
        }
    });
});

module.exports = router;