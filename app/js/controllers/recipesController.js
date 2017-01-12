let ctlr=angular.module("recipesController",['ui.router']);


ctlr.controller('recipesController',['$scope','$http', function($scope,$http){
  
    $http.get(server+'/recipes')
    .then((response)=>{
        $scope.Recipes=response.data;
        console.log($scope.Recipes);
   })
    .catch((error)=>{
        console.warn(error);
       $scope.Recipes='Server Error';
   });
       
}]);