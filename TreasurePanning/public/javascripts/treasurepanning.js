var app = angular.module('TreasurePanning', ['ngResource', 'ngRoute', 'angularUtils.directives.dirPagination']);

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
        .when('/contact-msg', {
            templateUrl: 'partials/view-messages.html',
            controller: 'ContactMsgCtrl'
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


app.run(function ($rootScope, $location, $window, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $window.location.reload(true);
        }else if(next.access.admin && !AuthService.isAdmin()){
          console.log(AuthService.user);
          $location.path('/login');
          $window.location.reload(true);
        }
      });
  });
});

app.controller('HomeCtrl', ['$scope', '$resource',
  function($scope, $resource) {
    var items = $resource('/api/items');
    var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
    items.query(function(items) {

      angular.forEach(items, function(item) {;
        currentPrice.get({
          id: item._id
        }, function(currentBid) {
          item.currentBid = currentBid.bidPrice;
        })
      });
      $scope.items = items;
      $scope.itemOrders = 'name';
    });
  }
]);

app.controller('ContactQueryCtrl', ['$timeout','$scope', '$resource', '$location',
  function($timeout,$scope, $resource, $location){
    $scope.save = function(){
      var Queries = $resource('/api/queries');
      Queries.save($scope.query, function(){
        $scope.successMessgae="Thanks! Your response has been recorded. Our team will contact you within 1-2 days.";
        $scope.query={};
        $timeout(function () {
          $location.path("/");
        }, 2000);
      });

      };
    }]);


app.controller('ContactMsgCtrl', ['$scope', '$resource',
  function($scope, $resource){
    $scope.viewMsgForm=true;
    var Messages = $resource('/api/queries');
    Messages.query(function(messages){
      $scope.messages = messages;
    },function(){
      $scope.successMessgae1="Currently there are no messages.";
      $scope.viewMsgForm=undefined;
      $timeout(function () {
        $location.path("/");
      }, 2000);
      });
}]);
