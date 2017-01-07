var petsApp = angular.module('petsApp', []);

petsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $scope.addPet = function() {
        var newPet = {
            name: $scope.nameIn,
            animal: $scope.animalIn,
            age: $scope.ageIn,
            imgUrl: $scope.imgUrlIn
        };
        console.log('Adding pet:', newPet);
        $http.post('/pets', newPet)
            .then(function(results) {
                console.log('Back from server:', results);
                $scope.getPets();
            });
    };

    $scope.getPets = function() {
        $http.get('/pets')
            .then(function(results) {
                console.log('Back from server:', results);
                $scope.pets = results.data;
            });
    };

    // Perform initial getPets() on page load
    $scope.getPets();
}]);
