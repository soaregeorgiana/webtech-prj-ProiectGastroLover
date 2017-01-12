let ctrll = angular.module('newIngredientController', []);

ctrll.controller('newIngredientController', ['$scope','$http', function($scope,$http) {
    $scope.ingredients = {};
    $scope.newIngredient=function(){
        $http.post('/ingredients',$scope.ingredients).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        });
    };
}]);