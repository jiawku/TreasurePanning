app.controller('AddItemCtrl', ['$scope','multipartForm',
  function($scope,multipartForm){
    $scope.item={};
    $scope.submit=function(){
      var uploadUrl="/api/items";
      console.dir($scope.item.image);
      multipartForm.post(uploadUrl,$scope.item);
    };
  }]);
