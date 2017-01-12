var models = require("../models");
var express = require("express");
var router = express.Router();


var Ingredient = models.names[0];

//create an ingredient
router.post('/ingredients', function(request, response) {
    Ingredient.create(request.body).then(function(ingredient) {
        Ingredient.findById(ingredient.id).then(function(ingredient) {
            response.status(201).send(ingredient);
        });
    });

});

router.post('/ingredients', function(request,response) {
    Ingredient.create(request.body).then(function(){
      response.status(201).send;
    }).catch(function(err){
      console.warn(err);
    })
});
//returns all ingredients
router.get('/ingredients', function(request, response) {
    Ingredient.findAll().then(function(ingredients) {
        response.status(200).send(ingredients);
    });

});
//returns one ingredient by id
router.get('/ingredients/:id', function(request, response) {
    Ingredient.findById(request.params.id).then(function(ingredient) {
        if (ingredient) {
            response.status(200).send(ingredient);
        }
        else {
            response.status(404).send();
        }
    });

});
// update a specific ingredient by id
router.put('/ingredients/:id', function(request, response) {
    Ingredient
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
// delete an ingredient by id
router.delete('/ingredients/:id', function(request, response) {
    Ingredient
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
