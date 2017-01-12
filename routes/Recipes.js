var models = require("../models");
var express = require("express");
var router = express.Router();


var Recipe = models.names[2];

// create a recipe
router.post('/recipes', function(request, response) {
    Recipe.create(request.body).then(function(recipe) {
        Recipe.findById(recipe.id).then(function(recipe) {
            response.status(201).send(recipe);
        });
    });

});
//returns all recipes
router.get('/recipes', function(request, response) {
    Recipe.findAll().then(function(recipes) {
        response.status(200).send(recipes);
    });

});
//returns one recipe by id
router.get('/recipes/:id', function(request, response) {
    Recipe.findById(request.params.id).then(function(recipe) {
        if (recipe) {
            response.status(200).send(recipe);
        }
        else {
            response.status(404).send();
        }
    });

});
//update a specific recipe by id
router.put('/recipes/:id', function(request, response) {
    Recipe
        .findById(request.params.id)
        .then(function(ingredient) {
            if (ingredient) {
                ingredient
                    .updateAttributes(request.body)
                    .then(function() {
                        response.status(200).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });

            }
            else {
                response.status(400).send();
            }
        });

});
//delete a specific recipe by id
router.delete('/recipes/:id', function(request, response) {
    Recipe
        .findById(request.params.id)
        .then(function(ingredient) {
            if (ingredient) {
                ingredient.destroy().then(function() {
                        response.status(200).send('deleted');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            }
            else {
                response.status(404).send('nu exista');
            }
        });

});

module.exports = router;
