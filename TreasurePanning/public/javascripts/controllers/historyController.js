app.controller('ViewBuyingHistoryCtrl', ['$scope', '$resource',
    function($scope, $resource){
        var buyingItems = $resource('/api/history/buying');
        buyingItems.query(function(buyingItems){
          $scope.history = buyingItems;

          },function(){
            $scope.successMessgae="Buying history is Empty.";
          }

        );
    }]);

app.controller('ViewSellingHistoryCtrl', ['$scope', '$resource',
  function($scope, $resource){
      var sellingItems = $resource('/api/history/selling');
      sellingItems.query(function(sellingItems){
        $scope.history = sellingItems;

        },function(){
          $scope.successMessgae="Selling history is Empty.";
        }

      );
  }]);
