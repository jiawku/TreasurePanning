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
        }, 2000);
      });
    };
  }]);
