let ct = angular.module('IngredientController', ['ui.router']);

ct.controller('IngredientController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    let $constructor = () => {
        $http.get(server + '/Links' + '/' + $stateParams.id + '/Recipes')
            .then((response) => {
                $scope.links = response.data;
                console.log($scope.links);
            })
            .catch((error) => {
                console.warn(error);
                $scope.ingredients = "Server error";
            });
            
            $scope.getRecipes();
            
            $http.get(server +'/ingredients/'+ $stateParams.id)
            .then((response)=>{
                $scope.Ingredient=response.data;
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    $scope.getRecipes = () => {
        $http.get(server +'/Recipes').then((res) => {
            $scope.recipes = res.data;
        });
    };
   
    $scope.addRecipe= (recipe) => {
        $http.post(server + '/Links' + '/' + $stateParams.id + '/Recipes', recipe)
          .then((response) => {
            $state.go($state.current, {}, {
              reload: true
            });
          })
          .catch((error) => console.log(error));
      };
    
    //ce afisam
    $scope.selected = {};
    
    //afisare/editare
    $scope.getTemplate = (link) => {
        if (link.id === $scope.selected.id) {
            return 'edit';
        }
        else {
            return 'display';
        }
    };
    
    
    $scope.editLink = (link) => {
        $scope.selected = angular.copy(link)
    };
    
    $scope.cancelEditing = () => {
        $scope.selected = {};
    };

    //salvare modificari 
     $scope.saveLink = (link) => {
        $http.put(server + '/Links' + '/' + $stateParams.id + '/Recipes', link)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                });
            }).catch((error) => console.log(error));
    };


    //buton de delete
    $scope.deleteLink = (link) => {
        $http.delete(server + '/links/' + link.id)
          .then((response) => {
            $state.go($state.current, {}, {
              reload: true
            });
          })
          .catch((error) => console.log(error));
      };
    
    $constructor();
}]);
