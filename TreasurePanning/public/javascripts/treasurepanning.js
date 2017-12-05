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
          controller: 'AddWishlistCtrl'
        })
        .when('/wishlist',{
          templateUrl: 'partials/wishlist-view.html',
          controller: 'ViewWishlistCtrl'
        })
        .when('/wishlist/delete/:id',{
          templateUrl: 'partials/wishlist-delete.html',
          controller: 'DeleteWishlistCtrl'
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


    app.controller('ViewWishlistCtrl', ['$scope', '$resource','$location', '$routeParams',
        function($scope, $resource,$location, $routeParams){
            $scope.showWishForm="True";
            var Wishlistitems = $resource('/api/wishlists',{get:{method:'get',isArray:true}});
            Wishlistitems.query(function(wishlistitems){
              $scope.wishlistitems = wishlistitems;

              },function(){
                $scope.successMessgae="Wishlist is Empty.";
                $scope.showWishForm=undefined;
              }
            );
        }]);

  app.controller('DeleteWishlistCtrl', ['$scope', '$resource', '$location', '$routeParams',
        function($scope, $resource, $location, $routeParams){

          var wishItem= $resource('/api/wishlists/item/:id');

          wishItem.get({id:$routeParams.id},function(myitem){
            $scope.myitem=myitem;

          });
        }]);
