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
        console.log("getinto timer");
        $timeout(function () {
          console.log("timeout");
          $location.path("/");
        }, 2000);
      });
    };
  }]);
