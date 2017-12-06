app.controller('ViewBuyingHistoryCtrl', ['$scope', '$resource',
  function($scope, $resource) {
    var buyingItems = $resource('/api/history/buying');
    var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
    buyingItems.query(function(buyingItems) {

        angular.forEach(buyingItems, function(item) {
          currentPrice.get({
            id: item._id
          }, function(currentBid) {
            item.currentBid = currentBid.bidPrice;
          })
        });
        $scope.history = buyingItems;
      }, function() {
        $scope.successMessgae = "Buying history is Empty.";
      }

    );
  }
]);

app.controller('ViewSellingHistoryCtrl', ['$scope', '$resource',
  function($scope, $resource) {
    var sellingItems = $resource('/api/history/selling');
    var currentPrice = $resource('/api/bids/itemCurrentBid/:id');
    sellingItems.query(function(sellingItems) {
        angular.forEach(sellingItems, function(item) {
          currentPrice.get({
            id: item._id
          }, function(currentBid) {
            item.currentBid = currentBid.bidPrice;
          })
        });
        $scope.history = sellingItems;
      }, function() {
        $scope.successMessgae = "Selling history is Empty.";
      }

    );
  }
]);
