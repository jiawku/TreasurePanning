var app = angular.module('TreasurePanning', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-item', {
            templateUrl: 'partials/item-form.html'
        })
        .when('/add-item', {
            templateUrl: 'partials/item-form.html',
            controller: 'AddItemCtrl'
        })
        .when('/item/:id', {
            templateUrl: 'partials/item-form.html',
            controller: 'EditItemCtrl'
        })
        .when('/item/delete/:id', {
            templateUrl: 'partials/item-delete.html',
            controller: 'DeleteItemCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
      var items = $resource('/api/items');
      items.query(function(items){
          $scope.items = items;
      });
    }]);

  // app.controller('HomeCtrl', ['$scope', '$resource',
  //     function($scope, $resource){
  //       var items = $resource('/users/:username');
  //       items.query({username:'jiawku'},function(items){
  //           $scope.items = items;
  //       });
  //     }]);

app.controller('AddItemCtrl', ['$scope', '$location',
    function($scope, $resource, $location){
      var items = $resource('/api/items',{},{
        save:{ method: 'POST' }
    });
      $scope.item={};
      $scope.submit = function(){
        items.save($scope.item,function(result){
          if(result.status !='OK')
            throw result.status;
          $scope.item.push(result.data);
        });
      };
    }]);

app.controller('EditItemCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var items = $resource('/api/items/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        });

        $scope.save = function(){
            items.update($scope.item, function(){
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteItemCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var items = $resource('/api/items/:id');

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        })

        $scope.delete = function(){
            items.delete({ id: $routeParams.id }, function(item){
                $location.path('/');
            });
        }
    }]);
