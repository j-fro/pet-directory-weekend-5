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
    $scope.getPets = function() {
        $http.get('/pets')
            .then(function(results) {
                console.log('Back from server:', results);
                $scope.pets = results.data;
                $scope.animalFilter = undefined;
            });
    };

    $scope.deletePet = function(petId) {
        $http.delete('/pets/' + petId)
            .then(function(results) {
                console.log('Back from server', results);
                $scope.getPets();
            });
    };

    $scope.sortPets = function(direction) {
        console.log('Sorting by:', $scope.sortType, direction);
        $scope.pets = $scope.pets.sort(function(a, b) {
            if (a[$scope.sortType] > b[$scope.sortType]) {
                return 1 * direction;
            } else if (a[$scope.sortType] < b[$scope.sortType]) {
                return -1 * direction;
            }
            return 0;
        });
    };

    // Perform initial getPets() on page load
    $scope.getPets();
}]);

petsApp.controller('AddPetsController', ['$scope', '$http', function($scope, $http) {
    $scope.addSuccess = false;
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
                    $scope.nameIn = undefined;
                    $scope.animalIn = undefined;
                    $scope.ageIn = undefined;
                    $scope.imgUrlIn = undefined;
                    $scope.addSuccess = true;
                }
            });
    };
}]);

petsApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    console.log('ng home');
}]);
