var app = angular.module('TreasurePanning', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-item', {
            templateUrl: 'partials/item-form.html',
            controller: 'AddItemCtrl'
        })
        .when('/item/:id', {
            templateUrl: 'partials/item-view.html',
            controller: 'ListItemCtrl'
        })
        .when('/item/delete/:id', {
            templateUrl: 'partials/item-delete.html',
            controller: 'DeleteItemCtrl'
        })
        .when('/contact-us', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        })
        .when('/about-us', {
            templateUrl: 'partials/about.html'
        })
        // .otherwise({
        //     redirectTo: '/'
        // });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource){
      var items = $resource('/api/items');
      items.query(function(items){
          $scope.items = items;
      });
    }]);

  // app.controller('HomeCtrl', ['$scope', '$resource',
  //     function($scope, $resource){
  //       var items = $resource('/users/:username');
  //       items.query({username:'jiawku'},function(items){
  //           $scope.items = items;
  //       });
  //     }]);

// app.controller('AddItemCtrl', ['$scope','$multipartForm',
//   function($scope,$multipartForm){
//     $scope.item={};
//     $scope.submit=function(){
//       var uploadUrl="/api/items";
//       multipartForm.post(uploadUrl,$scope.item);
//     };
//   }]);


    // function($scope, $resource, $location){
    //   var items = $resource('/api/items',{},{
    //     save: {
    //       method: 'POST',
    //       transformRequest: angular.identity,
    //       headers: { 'Content-Type': undefined }
    //     }
    // });
    //   $scope.item={};
    //   $scope.submit = function(){
    //     console.log($scope.item.image);
    //     items.save($scope.item,function(result){
    //       if(result.status !='OK')
    //         throw result.status;
    //       $scope.item.push(result.data);
    //       console.log($scope.item);
    //     });
    //   };
    // }]);

app.controller('ListItemCtrl', ['$scope', '$resource', '$routeParams',
    function($scope, $resource, $routeParams){
        var items = $resource('/api/items/:id', { id: '@_id' }, {
            update: { method: 'GET' }
        });

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        });
    }]);

app.controller('DeleteItemCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var items = $resource('/api/items/:id');

        items.get({ id: $routeParams.id }, function(item){
            $scope.item = item;
        })

        $scope.delete = function(){
            items.delete({ id: $routeParams.id }, function(item){
                $location.path('/');
            });
        }
    }]);
