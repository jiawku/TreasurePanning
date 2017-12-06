app.controller('AddWishlistCtrl', ['$scope', '$resource', '$routeParams','$location','$timeout',
    function($scope, $resource, $routeParams,$location,$timeout){
        var items = $resource('/api/items/:id');
        var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
        items.get({ id: $routeParams.id }, function(item){
              $scope.item = item;
              currentPrice.get({ id: $routeParams.id }, function(currentBid){
                $scope.item.currentBid=currentBid.bidPrice;
              });
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
app.controller('WishlistCtrl', ['$scope', '$resource', '$routeParams','$location','$timeout',
    function($scope, $resource, $routeParams,$location,$timeout){
      var items = $resource('/api/items/:id');
      var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
      items.get({ id: $routeParams.id }, function(item){
        $scope.item = item;
        currentPrice.get({ id: $routeParams.id }, function(currentBid){
          $scope.item.currentBid=currentBid.bidPrice;
        });
      });
      $scope.save = function(){
        var WishItems = $resource('/api/wishlists/:id',{id:$routeParams.id});
        WishItems.save($scope.item, function(){
         $scope.successMessgae="Item is added successfully to your wishlist.";
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
                var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
                Wishlistitems.query(function(wishlistitems){
                  angular.forEach(wishlistitems,function(item){;
                    currentPrice.get({ id: item._id}, function(currentBid){
                      item.currentBid=currentBid.bidPrice;
                    })});
                  $scope.wishlistitems = wishlistitems;
                  },function(){
                    $scope.successMessgae="Wishlist is Empty.";
                    $scope.showWishForm=undefined;
                  }
                );
            }]);

      app.controller('DeleteWishlistCtrl', ['$scope', '$resource', '$location', '$routeParams','$timeout','$window',
            function($scope, $resource, $location, $routeParams,$timeout,$window){
              var wishItem= $resource('/api/wishlists/:id');
              var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
              wishItem.get({id:$routeParams.id},function(data){
                  $scope.mywishitem=data;
                  currentPrice.get({ id: $routeParams.id }, function(currentBid){
                    $scope.mywishitem.currentBid=currentBid.bidPrice;
                  });

                $scope.delete = function(){
                $scope.successMessgae="Item is removed successfully from your wishlist.";
                wishItem.delete({ id: $routeParams.id }, function(){
                  $timeout(function () {
                    $location.path("/wishlist");
                    $window.location.reload(true);
                  }, 2000);
               });
              }
          );
  }]);

  app.controller('DeleteWishlistCtrl', ['$scope', '$resource', '$location', '$routeParams','$timeout','$window',
    function($scope, $resource, $location, $routeParams,$timeout,$window){
        var wishItem= $resource('/api/wishlists/:id');
        wishItem.get({id:$routeParams.id},function(data){
          $scope.mywishitem=data;
          $scope.delete = function(){
            $scope.successMessgae="Item is removed successfully from your wishlist.";
            wishItem.delete({ id: $routeParams.id }, function(){
            $timeout(function () {
              $location.path("/wishlist");
              $window.location.reload(true);
            }, 2000);
         });
        }
    });
  }]);
