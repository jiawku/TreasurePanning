var app = angular.module('TreasurePanning', ['ngResource','ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-item', {
            templateUrl: 'partials/item-form.html',
            controller: 'AddItemCtrl'
        })
        .when('/item/:id', {
            templateUrl: 'partials/item-view.html',
            controller: 'ListItemCtrl'
        })
        .when('/item/delete/:id', {
            templateUrl: 'partials/item-delete.html',
            controller: 'DeleteItemCtrl'
        })
        .when('/contact-us', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactQueryCtrl'
        })
        .when('/about-us', {
            templateUrl: 'partials/about.html'
        })
        .when('/login',{
          templateUrl: 'partials/login.html',
          controller:'LoginController'
        })
        .when('/register',{
          templateUrl: 'partials/register.html',
          controller:'RegisterController'
        })
        .when('/item/edit/:id',{
          templateUrl: 'partials/item-edit.html',
          controller: 'EditItemCtrl'
        })
        .when('/wishlist/:id',{
          templateUrl: 'partials/item-wishlist.html',
          controller: 'WishlistCtrl'
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
          $scope.itemOrders = 'name';
      });
    }]);

app.controller('ContactQueryCtrl', ['$scope', '$resource', '$location',
  function($scope, $resource, $location){
    $scope.save = function(){
      var Queries = $resource('/api/queries');
      Queries.save($scope.query, function(){
        $scope.successMessgae="Thanks! Your response has been recorded. Our team will contact you within 1-2 days.";
        $scope.query={};
      });

      };
    }]);

app.controller('ListItemCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams){
        var items = $resource('/api/items/:id');

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        });
    }]);

app.controller('DeleteItemCtrl', ['$timeout','$scope', '$resource', '$location', '$routeParams',
    function($timeout,$scope, $resource, $location, $routeParams){
        var Items = $resource('/api/items/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        });

        $scope.delete = function(){
            Items.update($scope.item, function(){
                $scope.successMessgae="Item is deleted successfully.";
                $timeout(function () {
                  $location.path("/");
                }, 2000);
            });
          }
    }]);

app.controller('EditItemCtrl', ['$timeout','$window','$resource','$scope','multipartForm','$location','$routeParams',
  function($timeout,$window,$resource,$scope,multipartForm,$location,$routeParams){
    var Items = $resource('/api/items/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
    });

    Items.get({ id: $routeParams.id }, function(item){
        $scope.item = item;
        $scope.item.addTimeStamp=new Date(item.addTimeStamp);
        $scope.item.endBidTime=new Date(item.endBidTime);
    });

    $scope.submit=function(){
      var uploadUrl="/api/items/"+$routeParams.id;
      multipartForm.post(uploadUrl,$scope.item).then(function(){
       $scope.successMessgae='Item is updated successfully.';
       $timeout(function () {
         $location.path("/");
         $window.location.reload(true);
       }, 2000);
    });
  };
}]);



app.controller('WishlistCtrl', ['$scope', '$resource', '$routeParams','$location','$timeout',
    function($scope, $resource, $routeParams,$location,$timeout){
        var items = $resource('/api/items/:id');

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        });

        $scope.save = function(){
           var WishItems = $resource('/api/wishlists/:id',{id:$routeParams.id});
           WishItems.save($scope.item, function(){
             $scope.successMessgae="Item is added to your wishlist.";
             $timeout(function () {
               $location.path("/");
             }, 2000);
           });
       };
    }]);
