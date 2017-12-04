app.directive('bidVerify', bidVerify);

  function bidVerify() {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      link: function(scope, elem, attrs,ngModel){
        scope.$watch(attrs.ngModel, function() {
          validate();
        });

        var validate = function() {
          // values
          var val1 = ngModel.$viewValue;
          var val2 = scope.maxBid;
          // set validity
          ngModel.$setValidity('bidVerify', val1 > val2);
          // ngModel.$setValidity('bidVerify_time',scope.endTime> new Date());
        };
      }
    }
  }
