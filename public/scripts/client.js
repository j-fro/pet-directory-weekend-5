var petsApp = angular.module('petsApp', ['ngRoute']);

petsApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/routes/home.html',
            controller: 'HomeController'
        })
        .when('/add', {
            templateUrl: 'views/routes/add.html',
            controller: 'AddPetsController'
        })
        .when('/show', {
            templateUrl: 'views/routes/show.html',
            controller: 'ShowPetsController'
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);

petsApp.controller('ShowPetsController', ['$scope', '$http', function($scope, $http) {
    // Get pets from the server and add to $scope.pets
    $scope.getPets = function() {
        $http.get('/pets')
            .then(function(results) {
                console.log('Back from server:', results);
                $scope.pets = results.data;
                $scope.animalFilter = undefined;
            });
    };

    // Request the server delete a pet from the db (by _id)
    $scope.deletePet = function(petId) {
        $http.delete('/pets/' + petId)
            .then(function(results) {
                console.log('Back from server', results);
                $scope.getPets();
            });
    };

    // Sort pets by selected sort type and direction (1 or -1)
    $scope.sortPets = function(direction) {
        console.log('Sorting by:', $scope.sortType, direction);
        $scope.pets = $scope.pets.sort(function(a, b) {
            if (a[$scope.sortType] > b[$scope.sortType]) {
                // Flips if direction is -1
                return 1 * direction;
            } else if (a[$scope.sortType] < b[$scope.sortType]) {
                // Flips if direction is -1
                return -1 * direction;
            }
            return 0;
        });
    };

    // Perform initial getPets() on page load
    $scope.getPets();
}]);

petsApp.controller('AddPetsController', ['$scope', '$http', function($scope, $http) {
    // Track success state for confirmation display
    $scope.addSuccess = false;
    // Send a new pet's info to the server to be added to the db
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
                if (results.status === 200) {
                    // Clear the input fields on successful insertion
                    $scope.nameIn = undefined;
                    $scope.animalIn = undefined;
                    $scope.ageIn = undefined;
                    $scope.imgUrlIn = undefined;
                    // Show confirmation to user
                    $scope.addSuccess = true;
                }
            });
    };
}]);

petsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    console.log('ng home');
}]);
