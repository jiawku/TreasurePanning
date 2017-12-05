app.controller('AddWishlistCtrl', ['$scope', '$resource', '$routeParams','$location','$timeout',
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
app.controller('WishlistCtrl', ['$scope', '$resource', '$routeParams','$location','$timeout',
    function($scope, $resource, $routeParams,$location,$timeout){
      var items = $resource('/api/items/:id');
      items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
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

    //
    // app.controller('ViewWishlistCtrl', ['$scope', '$resource',
    //     function($scope, $resource){
    //         var Wishlistitems = $resource('/api/wishlists');
    //         Wishlistitems.query(function(wishlistitems){
    //           $scope.wishlistitems = wishlistitems;
    //
    //           },function(){
    //             $scope.successMessgae="Wishlist is Empty.";
    //           }
    //
    //         );
    //     }]);

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

      app.controller('DeleteWishlistCtrl', ['$scope', '$resource', '$location', '$routeParams','$timeout',
            function($scope, $resource, $location, $routeParams,$timeout){
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
