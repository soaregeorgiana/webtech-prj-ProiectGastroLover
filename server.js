var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require('sequelize')
var models = require("./models"); 
var sequelize = models.sequelize;

var app = new express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + "/app"));

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));


//definire entitati 
var ingredientRest = require(__dirname + "/routes/Ingredients.js");
app.use(ingredientRest);

var recipeRest = require(__dirname + "/routes/Recipes.js");
app.use(recipeRest);

var linkRest = require(__dirname + "/routes/Links.js");
app.use(linkRest);


app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})
app.listen(process.env.PORT);
