let app=angular.module("app", ['ui.router','ngRoute','IngredientsController','IngredientController','newIngredientController','recipesController']);

app.config(["$stateProvider", '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/Home');
    
    $stateProvider
    .state('Home',{
       url: '/Home',
       templateUrl: 'views/home.html'
        
    })
      
    .state('Help',{
       url: '/Help',
       template: '<h2>Ai nevoie de ajutor? Daca da, intra in sectiunea contact si contacteaza-ne.</h2>'
        
    })
    .state('Contact',{
       url: '/Contact',
       template: '<h3><center>Telefon:0757207022<br/>E-mail:gastrolover@yahoo.com<br/>Adresa:Bucuresti,Romania</center></h3>'
        
    })
    .state('Recipes',{
       url: '/Recipes',
       templateUrl: 'views/recipes.html',
       controller:'recipesController'
        
    })
    .state('Ingredients',{
       url: '/Ingredients',
       templateUrl:'views/Ingredients.html',
       controller: 'IngredientsController'
        
    })
    .state('addIngredient',{
       url: '/addIngredient',
       templateUrl:'views/addIngredient.html',
       controller: 'newIngredientController'
        
    })
    .state('Ingredient',{
       url: '/Ingredient/:id',
       templateUrl:'views/Ingredient.html',
       controller: 'IngredientController'
        
    })
  
     
}]);
