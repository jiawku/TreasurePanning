app.controller('LoginController', ['$window', '$timeout', '$scope', '$location', 'AuthService',
  function($window, $timeout, $scope, $location, AuthService) {
    $scope.showForm = "True";
    $scope.user = {};
    $scope.message = undefined;
    $scope.submit = function() {
      AuthService.login($scope.user.username, $scope.user.password)
        // handle success
        .then(function() {
          $scope.loginStatus = "alert-success";
          $scope.message = "Login Success, Please wait two seconds for redirection.";
          $scope.showForm = undefined;
          $scope.user = {};
          $timeout(function() {
            $location.path("/");
            $window.location.reload(true);
          }, 2000);
        })
        // handle error
        .catch(function() {
          $scope.error = true;
          $scope.message = "Invalid username and/or password";
          $scope.user = {};
          $scope.loginStatus = "alert-danger";
        });
    }

  }
]);


app.controller('LogoutController', ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.logout = function() {

      // call logout from service
      AuthService.logout()
        .then(function() {
          $location.path('/');
        });

    };

  }
]);

app.controller('RegisterController', ['$timeout', '$scope', '$location', 'AuthService',
  function($timeout, $scope, $location, AuthService) {
    $scope.registerStatus = "alert-success";
    $scope.registerMessage = undefined;
    $scope.signupForm = {};

    $scope.register = function() {
      // call register from service
      AuthService.register($scope.signupForm.username,
          $scope.signupForm.password,
          $scope.signupForm.firstname,
          $scope.signupForm.lastname,
          $scope.signupForm.phone,
          $scope.signupForm.address,
          $scope.signupForm.email)
        // handle success
        .then(function() {
          $scope.signupForm = {};
          $scope.password2 = undefined;
          $scope.registerForm.$setPristine();
          $scope.registerForm.$setUntouched();
          $scope.registerStatus = "alert-success";
          $scope.registerMessage = "Registration Success, Please wait two seconds for redirection.";
          $timeout(function() {
            $location.path("/login");
          }, 2000);
          $scope.signupForm = {};
        })
        // handle error
        .catch(function() {
          $scope.registerStatus = "alert-danger";
          $scope.registerMessage = "This username already exist,please try again";
          $scope.signupForm = {};
          $scope.password2 = undefined;
          $scope.registerForm.$setPristine();
          $scope.registerForm.$setUntouched();
        });

    };
  }
]);
