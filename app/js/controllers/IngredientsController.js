let ctl=angular.module("IngredientsController",['ui.router']);
const server="https://webtech-baza-date-geosoare995.c9users.io";

ctl.controller('IngredientsController',['$scope','$http', function($scope,$http){
  
    $http.get(server+'/ingredients')
    .then((response)=>{
        $scope.Ingredients=response.data;
        console.log($scope.Ingredients);
    })
    .catch((error)=>{
        console.warn(error);
        $scope.Ingredients='Server Error';
    });
}]);