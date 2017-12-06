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
        .when('/buyingHistory',{
          templateUrl: 'partials/view-History.html',
          controller: 'ViewBuyingHistoryCtrl'
        })
        .when('/sellingHistory',{
          templateUrl: 'partials/view-History.html',
          controller: 'ViewSellingHistoryCtrl'
        })
        .otherwise({
            redirectTo: '/'
          });
}]);


app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
      var items = $resource('/api/items');
      var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
      items.query(function(items){

          angular.forEach(items,function(item){;
            currentPrice.get({ id: item._id}, function(currentBid){
              item.currentBid=currentBid.bidPrice;
            })});
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
