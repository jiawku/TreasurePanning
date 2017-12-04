app.directive('bidVerify', bidVerify);

  function bidVerify() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs,ngModel){
        console.log("here");
        scope.$watch(attrs.ngModel, function() {
          validate();
        });


        // // watch own value and re-validate on change
        // attrs.$observe('bidVerify', function(val) {
        //   validate();
        // });


        var validate = function() {
          // values
          var val1 = attrs.passwordVerify;
          var val2 = scope.maxBid;
          console.log("val1: "+val1);
          console.log("val2: "+val2);
          // set validity
          ngModel.$setValidity('bidVerify', val1 > val2);
        };
      }
    }
  }
