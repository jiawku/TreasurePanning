app.controller('AddItemCtrl', ['$timeout','$scope','multipartForm','$location',
  function($timeout,$scope,multipartForm,$location){
    $scope.item={};
    $scope.showForm="True";
    $scope.submit=function(){
      var uploadUrl="/api/items";
      multipartForm.post(uploadUrl,$scope.item).then(function(){
        $scope.successMessgae='Item is added successfully.';
        $scope.item={};
        $scope.showForm=undefined;
        $timeout(function () {
          $location.path("/");
          $window.location.reload(true);
        }, 2000);
      });
    };
  }]);

  app.controller('ListItemCtrl', ['$scope', '$resource', '$routeParams',
      function($scope, $resource, $routeParams){
          var items = $resource('/api/items/:id');
          $scope.bids={};
          items.get({ id: $routeParams.id }, function(item){
              $scope.item = item;
          });

          var itemBids= $resource('/api/bids/item/:id',
                                  {id:$routeParams.id},
                                  {get:{method:'get',isArray:true}}
                                 );

          itemBids.get({id:$routeParams.id},function(bids){
            $scope.bids=bids;
            $scope.maxBid = Math.max.apply(Math,$scope.bids.map(function(bid){return bid.bidPrice;}));

          });


          // $scope.max = Math.max.apply(Math,$scope.bids.map(function(bid){return bid.bidPrice;}));
          // console.log($scope.max);

          $scope.addBid = function(){
              $scope.newBid.itemID=$routeParams.id;
              var bid = $resource('/api/bids');
              bid.save($scope.newBid, function(res){
                  $scope.bidMessage="Bid is added successfully.";
                  $scope.bidStatus="alert-success";
                  $scope.newBid={};
                  $scope.bidForm.$setPristine();
                  $scope.bidForm.$setUntouched();
                  // $location.path('/');
                  console.log(res);
              });
          };
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
