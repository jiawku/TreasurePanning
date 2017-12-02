app.controller('LoginController', ['$timeout','$scope','$location','auth',
  function($timeout,$scope,$location,auth){
    $scope.showForm="True";
    $scope.user={};
    $scope.message=undefined;
    $scope.submit=function(){
      auth.login($scope.user.username,$scope.user.password)
      .then(function(resMessage){
        if(resMessage=="loginSuccess"){
          $scope.message="Login Success, Please wait two seconds for redirection.";
          $scope.showForm=undefined;
          $timeout(function () {
            $location.path("/");
          }, 2000);
        }
      })

      // multipartForm.post(uploadUrl,$scope.item).then(function(){
      //   $scope.successMessgae='Item is added successfully.';
      //   $scope.item={};
      //   $scope.showForm=undefined;
      //   console.log("getinto timer");
      //   $timeout(function () {
      //     console.log("timeout");
      //     $location.path("/");
      //   }, 2000);
      // });
      // $location.path("/");


    };
  }]);
