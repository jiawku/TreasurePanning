app.controller('AddItemCtrl', ['$scope','multipartForm',
  function($scope,multipartForm){
    $scope.item={};
    $scope.submit=function(){
      var uploadUrl="/api/items";
      multipartForm.post(uploadUrl,$scope.item);
    };
  }]);
