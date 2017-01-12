'use strict'
var models = require("../models");
var express = require("express");
var router = express.Router();

var Ingredient = models.names[0];
var Link = models.names[1];
var Recipe = models.names[2];

Recipe.hasMany(Link, {
    foreignKey: 'id_recipe'
});
Link.belongsTo(Recipe, {
    foreignKey: 'id_recipe'
});

Ingredient.hasMany(Link, {
    foreignKey: 'id_ingredient'
});

Link.belongsTo(Ingredient, {
    foreignKey: 'id_ingredient'
});




router.post('/links', function(request, response) {
    Link.create(request.body).then(function(link) {
        Link.findById(link.id).then(function(link) {
            response.status(201).send(link);
        });
    });

});

router.get('/links', function(request, response) {
    Link.findAll().then(function(links) {
        response.status(200).send(links);
    });

});

router.get('/links/:id', function(request, response) {
    Link.findById(request.params.id).then(function(link) {
        if (link) {
            response.status(200).send(link);
        }
        else {
            response.status(404).send();
        }
    });

});


router.get('/Links/:id/Recipes', (req, res) => {
    Link
        .findAll({
            where: {
                id_ingredient: req.params.id
            },
            include: [Ingredient, Recipe]
        })
        .then((Recipes) => {
            res.status(201).send(Recipes);
        })
});


router.post('/Links/:id/Recipes', (req, res) => {
    Link
        .find({
            where: {
                id_ingredient: req.params.id
            }
        })
        .then((link) => {
            var recipe = req.body
            Recipe.find({
                    where: {
                        name: recipe.name
                    }
                })
                .then(function(recipeFound) {
                    var newrec = {}
                    newrec.id_ingredient = req.params.id;
                    if (recipeFound) {
                       
                        newrec.id_recipe = recipeFound.id;
                        return Link.create(newrec)
                    }
                    else {
                        
                        var newRecipe = {};
                        newRecipe.name = recipe.name;
                        newRecipe.descriptionRec = recipe.descriptionRec;
                        newRecipe.difficulty = recipe.difficulty;
                        Recipe.create(newRecipe).then(function(recipe) {
                            Recipe.findById(recipe.id).then(function(recipe) {
                                newrec.id_recipe = recipe.id;
                                return Link.create(newrec)

                            });
                        });
                    }
                })
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

router.put('/links/:id', function(request, response) {
    Link
        .findById(request.params.id)
        .then(function(link) {
            if (link) {
                link
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

router.put('/Links/:id/Recipes', (req, res) => {
    Link
    
        .find({
            where: {
                id_ingredient: req.params.id,
                id_recipe: req.body.id_recipe
            }
        })
        .then((link) => {
           
            Recipe
            .find({
                where: {
                    id : link.id_recipe
                }
            }).then((recipe) => {
                recipe.name = req.body.Recipe.name;
                recipe.descriptionRec = req.body.Recipe.descriptionRec;
                recipe.difficulty=req.body.Recipe.difficulty;
                return recipe.save();
            })
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

});

router.delete('/links/:id', function(request, response) {
    Link
        .findById(request.params.id)
        .then(function(link) {
            if (link) {
                link.destroy().then(function() {
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

})

module.exports = router;
